import Navigation from "./Navigation";
import WhatsAppWidget from "./WhatsAppWidget";
import Footer from "./Footer";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <WhatsAppWidget />
      {children}
      <Footer />
    </>
  );
}
