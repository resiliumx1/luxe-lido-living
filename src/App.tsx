import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Navigation from "./components/Navigation";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Index from "./pages/Index";
import LuxuryHomes from "./pages/LuxuryHomes";
import ContainerHomes from "./pages/ContainerHomes";
import PrefabHomes from "./pages/PrefabHomes";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <WishlistProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Skip link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[99999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 font-sans font-semibold text-sm"
            >
              Skip to main content
            </a>
            <Routes>
              {/* Admin routes — no public nav/whatsapp */}
              <Route path="/admin/login" element={<AdminDashboard />} />
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
                <Route path="viewings" element={<InquiriesAdmin />} />
                <Route path="leads" element={<InquiriesAdmin />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Public routes */}
              <Route path="/" element={<><Navigation /><WhatsAppWidget /><Index /></>} />
              <Route path="/luxury-homes" element={<><Navigation /><WhatsAppWidget /><LuxuryHomes /></>} />
              <Route path="/container-homes" element={<><Navigation /><WhatsAppWidget /><ContainerHomes /></>} />
              <Route path="/prefab-homes" element={<><Navigation /><WhatsAppWidget /><PrefabHomes /></>} />
              <Route path="/properties/:id" element={<><Navigation /><WhatsAppWidget /><PropertyDetail /></>} />
              <Route path="/about" element={<><Navigation /><WhatsAppWidget /><About /></>} />
              <Route path="/contact" element={<><Navigation /><WhatsAppWidget /><Contact /></>} />
              <Route path="*" element={<><Navigation /><WhatsAppWidget /><NotFound /></>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </WishlistProvider>
  </ThemeProvider>
);

export default App;
