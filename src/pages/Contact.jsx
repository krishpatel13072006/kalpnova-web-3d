import ContactForm from "../sections/ContactForm";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <main className="pt-32 pb-48">
      <SEO 
        title="Contact Us"
        description="Get in touch with Kalpnova to discuss high-impact design and strategic growth solutions for your next project."
        url="/contact"
      />
      <ContactForm />
    </main>
  );
}
