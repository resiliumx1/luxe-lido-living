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
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <WishlistProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <WhatsAppWidget />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/luxury-homes" element={<LuxuryHomes />} />
              <Route path="/container-homes" element={<ContainerHomes />} />
              <Route path="/prefab-homes" element={<PrefabHomes />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </WishlistProvider>
  </ThemeProvider>
);

export default App;
