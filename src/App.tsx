import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import ScrollProgress from "./components/ScrollProgress";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import ContainerHomes from "./pages/ContainerHomes";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminGuard from "./components/admin/AdminGuard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PropertiesAdmin from "./pages/admin/PropertiesAdmin";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin";
import AdminContainers from "./pages/admin/AdminContainers";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <WhatsAppWidget />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <WishlistProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[99999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 font-body font-semibold text-sm"
            >
              Skip to main content
            </a>
            <Routes>
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/*" element={
                <AdminGuard><AdminLayout /></AdminGuard>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="properties" element={<PropertiesAdmin />} />
                <Route path="containers" element={<AdminContainers />} />
                <Route path="inquiries" element={<InquiriesAdmin />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Public routes */}
              <Route path="/" element={<PublicLayout><Index /></PublicLayout>} />
              <Route path="/properties" element={<PublicLayout><Properties /></PublicLayout>} />
              <Route path="/properties/:slug" element={<PublicLayout><PropertyDetail /></PublicLayout>} />
              <Route path="/container-homes" element={<PublicLayout><ContainerHomes /></PublicLayout>} />
              <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />
              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </WishlistProvider>
  </ThemeProvider>
);

export default App;
