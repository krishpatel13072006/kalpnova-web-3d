import ServicesGrid from "../sections/ServicesGrid";
import WorkPortfolio from "./workportfolio";
import SEO from "../components/SEO";

export default function Services() {
  return (
    <main className="pt-32">
      <SEO 
        title="Our Services"
        description="Explore Kalpnova's premium high-impact services, including 3D web design, strategic identity, and high-performance digital solutions."
        url="/services"
      />
      <WorkPortfolio />
    </main>
  );
}
