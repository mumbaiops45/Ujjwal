import PageHero from "@/components/PageHero";
import ProductsShowcase from "@/components/products/ProductsShowcase";

const heroStats = [
  { num: "2",     accent: "",      label: "Product Divisions"  },
  { num: "8+",    accent: "",      label: "Product Categories" },
  { num: "35+",   accent: "",      label: "Years Experience"   },
  { num: "Pan",   accent: "India", label: "Supply Network"     },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="Ujjwal Poly Pack India Pvt. Ltd."
        title="Our"
        highlight="Products"
        image="/products/LDPE   BAGS_1.png"
        stats={heroStats}
      />
      <ProductsShowcase />
    </>
  );
}
