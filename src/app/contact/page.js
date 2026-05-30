import PageHero from "@/components/PageHero";
import ContactShowcase from "@/components/contact/ContactShowcase";

const heroStats = [
  { num: "35+",    accent: "",       label: "Years of Experience" },
  { num: "100+",   accent: "",       label: "Production Staff"    },
  { num: "Pan",    accent: "India",  label: "Supply Network"      },
  { num: "Export", accent: " Ready", label: "Quality Standards"   },
];

export const metadata = {
  title: "Contact Us | Ujjwal Poly Pack India Pvt. Ltd.",
  description:
    "Get in touch with Ujjwal Poly Pack for bulk orders, custom packaging specifications and export supply enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Ujjwal Poly Pack India Pvt. Ltd."
        title="Get In"
        highlight="Touch"
        image="/products/LDPE   BAGS_1.png"
        stats={heroStats}
      />
      <ContactShowcase />
    </>
  );
}
