import PageHero from "@/components/PageHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutJourney from "@/components/about/AboutJourney";
import AboutMission from "@/components/about/AboutMission";
import AboutInfrastructure from "@/components/about/AboutInfrastructure";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Ujjwal Poly Pack India Pvt. Ltd."
        title="About"
        highlight="Us"
        subtitle="Three decades of engineering-driven manufacturing excellence — trusted by apparel brands, FMCG companies and industrial businesses across India and beyond."
        image="/about/about-hero.jpg"
      />
      <AboutIntro />
      <AboutJourney />
      <AboutMission />
      <AboutInfrastructure />
      <AboutValues />
      <AboutCTA />
    </>
  );
}
