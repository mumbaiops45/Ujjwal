"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiShield, FiAward, FiUsers } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon     : <FiShield />,
    title    : "Quality First",
    desc     : "Every product we manufacture undergoes strict multi-stage quality checks. We don't compromise on quality — it is built into our process from raw material to dispatch.",
    stat     : "Zero",
    statLabel: "Compromise",
  },
  {
    icon     : <FiAward />,
    title    : "Manufacturing Excellence",
    desc     : "35+ years of manufacturing expertise with advanced machinery, engineered workflows and a skilled technical team dedicated to precision output at industrial scale.",
    stat     : "35+",
    statLabel: "Years",
  },
  {
    icon     : <FiUsers />,
    title    : "Long-Term Relationships",
    desc     : "We believe in partnerships, not transactions. When we earn your business, our promise is to keep it — delivering consistent quality and reliability year after year.",
    stat     : "100+",
    statLabel: "Team",
  },
];

export default function AboutValues() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 55, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)]/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div ref={headerRef} className="text-center mb-16">
          <span className="section-label">Core Values</span>
          <h2 className="section-heading">
            What Drives Our{" "}
            <span className="text-[var(--secondary)]">Manufacturing</span>
          </h2>
          <p className="text-[var(--accent)]/60 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            Our values are not just words — they are the principles embedded in
            every product we make and every relationship we build.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="group bg-white border border-[var(--primary)]/10 p-10 hover:border-[var(--secondary)]/30 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Icon */}
              <div className="text-[var(--secondary)] text-3xl mb-6">
                {v.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--accent)]/65 text-sm leading-relaxed flex-1 mb-8">
                {v.desc}
              </p>

              {/* Stat footer */}
              <div className="border-t border-[var(--primary)]/8 pt-5 flex items-end justify-between">
                <div>
                  <div className="text-3xl font-black text-[var(--primary)] leading-none">
                    {v.stat}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--accent)]/45 mt-1">
                    {v.statLabel}
                  </div>
                </div>

                {/* Accent line grows on hover */}
                <div className="h-px w-0 group-hover:w-1/2 bg-[var(--secondary)]/35 transition-all duration-500 self-end" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
