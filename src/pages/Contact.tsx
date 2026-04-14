import heroImg from "@/assets/hero_villa.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import PageBanner from "@/components/PageBanner";
import ContactForm from "@/components/ContactForm";


export default function Contact() {
  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={villaTerraceImg}
        title="Contact"
        subtitle="Start a conversation"
      />
      <main id="main-content">
        <ContactForm />
      </main>
    </div>
  );
}
