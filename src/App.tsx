import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import PublicShell from "./components/PublicShell";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import LuxuryHomes from "./pages/LuxuryHomes";
import ContainerHomes from "./pages/ContainerHomes";
import PrefabHomes from "./pages/PrefabHomes";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Properties from "./pages/Properties";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./components/admin/AdminGuard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PropertiesAdmin from "./pages/admin/PropertiesAdmin";
import PhotoManager from "./pages/admin/PhotoManager";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin";
import AdminContainers from "./pages/admin/AdminContainers";
import AdminSettings from "./pages/admin/AdminSettings";
import ContainerHub from "./pages/container/Hub";
import ContainerVerticalPage from "./pages/container/VerticalPage";
import ContainerProductDetail from "./pages/container/ProductDetail";
import ContainerConfigure from "./pages/container/Configure";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <CurrencyProvider>
      <WishlistProvider>
        <AdminAuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                {/* Skip link */}
                <
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[99999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 font-sans font-semibold text-sm"
                >
                  Skip to main content
                </a>
                <Routes>
                  {/* Admin login — no guard */}
                  <Route path="/admin/login" element={<AdminLogin />} />

                  {/* Admin routes — guarded */}
                  <Route path="/admin/*" element={
                    <AdminGuard>
                      <AdminLayout />
                    </AdminGuard>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="properties" element={<PropertiesAdmin />} />
                    <Route path="containers" element={<AdminContainers />} />
                    <Route path="photos" element={<PhotoManager />} />
                    <Route path="inquiries" element={<InquiriesAdmin />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Public routes */}
                  <Route path="/" element={<PublicShell><Index /></PublicShell>} />
                  <Route path="/luxury-homes" element={<PublicShell><LuxuryHomes /></PublicShell>} />
                  <Route path="/container-homes" element={<PublicShell><ContainerHomes /></PublicShell>} />
                  <Route path="/prefab-homes" element={<PublicShell><PrefabHomes /></PublicShell>} />
                  <Route path="/properties" element={<PublicShell><Properties /></PublicShell>} />
                  <Route path="/properties/:id" element={<PublicShell><PropertyDetail /></PublicShell>} />
                  <Route path="/services" element={<PublicShell><Services /></PublicShell>} />
                  <Route path="/about" element={<PublicShell><About /></PublicShell>} />
                  <Route path="/contact" element={<PublicShell><Contact /></PublicShell>} />

                  {/* Container Solutions */}
                  <Route path="/container-solutions" element={<PublicShell><ContainerHub /></PublicShell>} />
                  <Route path="/container-solutions/:vertical" element={<PublicShell><ContainerVerticalPage /></PublicShell>} />
                  <Route path="/container-solutions/:vertical/:productId" element={<PublicShell><ContainerProductDetail /></PublicShell>} />
                  <Route path="/container-solutions/:vertical/:productId/configure" element={<PublicShell><ContainerConfigure /></PublicShell>} />

                  <Route path="*" element={<PublicShell><NotFound /></PublicShell>} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </AdminAuthProvider>
      </WishlistProvider>
    </CurrencyProvider>
  </ThemeProvider>
);

export default App;
