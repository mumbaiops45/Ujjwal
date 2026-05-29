"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    year: "1989",
    title: "Company Founded",
    badge: "Founded",
    desc: "Ujjwal Poly Pack was established in Bengaluru, Karnataka, with a vision to manufacture high-quality flexible packaging solutions for India's growing industrial sector.",
  },
  {
    year: "2000",
    title: "Expanded Production",
    badge: "Growth",
    desc: "Significant capacity expansion with new machinery and a larger production facility, enabling us to serve a broader base of industrial clients across southern India.",
  },
  {
    year: "2010",
    title: "Garment Trim Division",
    badge: "Diversified",
    desc: "Launched a dedicated garment trim division producing elastic products, woven trims and garment accessories for India's export-oriented apparel industry.",
  },
  {
    year: "2020",
    title: "Pan India Supply",
    badge: "National",
    desc: "Established a robust Pan India supply network, extending our reach to apparel brands, FMCG companies and retail manufacturers across every major city.",
  },
];

export default function AboutJourney() {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const timelineRef  = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header fade-up */
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      /* Connector lines draw left → right */
      gsap.fromTo(
        ".journey-connector",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, stagger: 0.2, duration: 0.65, ease: "power2.inOut",
          scrollTrigger: { trigger: timelineRef.current, start: "top 82%" },
        }
      );

      /* Circle nodes pop in */
      gsap.fromTo(
        ".journey-circle",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, stagger: 0.15, duration: 0.55, ease: "back.out(1.8)",
          scrollTrigger: { trigger: timelineRef.current, start: "top 82%" },
          delay: 0.2,
        }
      );

      /* Cards stagger up */
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll(".journey-card"),
          { y: 55, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
            delay: 0.3,
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)] overflow-hidden">

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5">
            Company Journey
          </span>
          <h2
            className="text-white font-black"
            style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          >
            35+ Years of{" "}
            <span className="text-[var(--secondary)]">Manufacturing</span>{" "}
            Excellence
          </h2>
          <p className="text-white/40 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            From a single facility in Bengaluru to a Pan India supply network —
            our journey is built on consistency, quality and long-term partnerships.
          </p>
        </div>

        {/* ── Desktop: horizontal timeline ── */}
        <div ref={timelineRef} className="hidden lg:block">

          {/* Circles + connectors row */}
          <div className="relative flex items-start gap-0 mb-0">
            {journey.map((item, i) => (
              <div key={i} className="flex-1 relative">

                {/* Connector line */}
                {i < journey.length - 1 && (
                  <div className="absolute top-7 left-1/2 w-full h-px z-0">
                    <div
                      className="journey-connector h-full"
                      style={{
                        background: "linear-gradient(90deg, var(--secondary), var(--primary))",
                        opacity: 0.35,
                      }}
                    />
                  </div>
                )}

                {/* Circle node */}
                <div className="journey-circle relative z-10 flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--secondary)]/12 border-2 border-[var(--secondary)]/45 flex items-center justify-center">
                    <span className="text-[var(--secondary)] text-[10px] font-black tracking-wider">
                      {item.badge.substring(0, 3).toUpperCase()}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Cards below circles */}
          <div className="flex gap-4 mt-8">
            {journey.map((item, i) => (
              <div
                key={i}
                className="journey-card flex-1 border border-white/10 bg-white/5 p-7 hover:bg-white/10 hover:border-[var(--secondary)]/35 transition-all duration-300 group"
              >
                <p className="text-[var(--secondary)] font-black leading-none mb-4"
                   style={{ fontSize: "clamp(36px, 3.5vw, 52px)" }}>
                  {item.year}
                </p>

                <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-[var(--secondary)] bg-[var(--secondary)]/10 px-2 py-1 mb-4">
                  {item.badge}
                </span>

                <h3 className="text-white text-lg font-bold mb-3">{item.title}</h3>

                <p className="text-white/48 text-sm leading-relaxed group-hover:text-white/65 transition-colors duration-300">
                  {item.desc}
                </p>

                {/* Bottom accent line grows on hover */}
                <div className="h-px w-0 group-hover:w-full bg-[var(--secondary)]/35 transition-all duration-500 mt-6" />
              </div>
            ))}
          </div>

        </div>

        {/* ── Mobile: vertical timeline ── */}
        <div className="lg:hidden flex flex-col gap-6">
          {journey.map((item, i) => (
            <div key={i} className="flex gap-5">

              {/* Left rail */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[var(--secondary)]/12 border-2 border-[var(--secondary)]/45 flex items-center justify-center shrink-0">
                  <span className="text-[var(--secondary)] text-[9px] font-black">
                    {item.badge.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                {i < journey.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2"
                    style={{ background: "var(--secondary)", opacity: 0.2, minHeight: "32px" }}
                  />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 border border-white/10 bg-white/5 p-6 mb-2">
                <p className="text-[var(--secondary)] text-4xl font-black leading-none mb-3">
                  {item.year}
                </p>
                <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
