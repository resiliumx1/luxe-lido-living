import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthContextType {
  /** True when a valid Supabase session exists AND the account has the admin role. */
  isAuthenticated: boolean;
  /** Still resolving the session / role — render nothing rather than redirecting. */
  loading: boolean;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const resolveRole = useCallback(async (activeSession: Session | null) => {
    if (!activeSession) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // Does this account already hold the admin role?
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", activeSession.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (roles) {
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // One-time bootstrap: the first account ever created claims admin.
    // Returns false for everyone else once an admin exists.
    const { data: claimed } = await supabase.rpc("claim_admin_if_none");
    setIsAdmin(claimed === true);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (cancelled) return;
      setSession(nextSession);
      setLoading(true);
      // Defer async work out of the auth callback.
      setTimeout(() => {
        if (!cancelled) void resolveRole(nextSession);
      }, 0);
    });

    void (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(data.session);
      await resolveRole(data.session);
    })();

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [resolveRole]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin/login` },
    });
    return {
      error: error ? error.message : null,
      needsConfirmation: !error && !data.session,
    };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: Boolean(session) && isAdmin,
        loading,
        session,
        signIn,
        signUp,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be inside AdminAuthProvider");
  return ctx;
}
