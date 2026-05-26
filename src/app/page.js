import Hero          from "@/components/Home/Hero";
import About         from "@/components/Home/About";
import Division from "@/components/Home/Division";
import Products from "@/components/Home/Products";
import Infrastructure from "@/components/Home/Infrastructure";
import WhyChooseUs   from "@/components/Home/WhyChooseUs";
import Industries    from "@/components/Home/Industries";
import TrustedBrands from "@/components/Home/TrustedBrands";
import QualityProcess from "@/components/Home/QualityProcess";
import CTABanner     from "@/components/Home/CTABanner";

export const metadata = {
  title: "Ujjwal Poly Pack India Pvt. Ltd. | Flexible Packaging Manufacturer",
  description:
    "Leading manufacturer of PP, LDPE, HDPE packaging and garment trim products since 1989. Industrial scale, export quality, pan India supply.",
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      {/* 2. About Company */}
      <About />

      {/* 3. Core Product Divisions */}
      <Division />

      {/* products */}
      <Products />

      {/* 4. Manufacturing Excellence / Infrastructure */}
      <Infrastructure />

      {/* 5. Why Choose Us */}
      <WhyChooseUs />

      {/* 6. Industries We Serve */}
      <Industries />

      {/* 7. Trusted By Brands */}
      <TrustedBrands />

      {/* 8. Quality Process */}
      <QualityProcess />

      {/* 9. CTA Banner */}
      <CTABanner />
    </main>
  );
}
