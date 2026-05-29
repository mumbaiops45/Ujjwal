import PageHero from "@/components/PageHero";
import InfrastructureShowcase from "@/components/infrastructure/InfrastructureShowcase";

const heroStats = [
  { num: "35+",  accent: "",      label: "Years of Operation" },
  { num: "100+", accent: "",      label: "Production Staff"   },
  { num: "2",    accent: "",      label: "Product Divisions"  },
  { num: "Pan",  accent: "India", label: "Supply Network"     },
];

export const metadata = {
  title: "Infrastructure | Ujjwal Poly Pack India Pvt. Ltd.",
  description:
    "Precision manufacturing infrastructure with advanced weaving machines, high-speed packaging lines and integrated quality inspection systems.",
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        label="Ujjwal Poly Pack India Pvt. Ltd."
        title="Our"
        highlight="Infrastructure"
        image="/products/WOVEN  ELASTIC  TAPE.png"
        stats={heroStats}
      />
      <InfrastructureShowcase />
    </>
  );
}
