

# Remove Admin Password Protection (Temporary)

## What Changes

Bypass the auth guard so `/admin` routes are accessible without logging in. The login page will no longer be needed temporarily.

### 1. `src/components/admin/AdminGuard.tsx`
- Remove the auth check logic entirely
- Simply render `children` immediately (pass-through wrapper)

### 2. `src/App.tsx`  
- Change the `/admin/login` route to redirect to `/admin` instead of showing the login form
- Keep AdminGuard wrapper but it will be a no-op

This is a temporary development convenience — auth can be re-enabled later by restoring the guard logic.

