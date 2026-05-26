"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  MdOutlineInventory2,
  MdOutlinePrecisionManufacturing,
  MdOutlineVerified,
  MdOutlineInventory,
  MdOutlineLocalShipping,
} from "react-icons/md";

const steps = [
  {
    step: "01",
    icon: <MdOutlineInventory2 className="text-3xl" />,
    title: "Raw Material",
    desc: "Premium-grade PP, LDPE and HDPE granules sourced from certified suppliers. Every lot is tested for quality before entering production.",
    tags: ["Grade A Material", "Supplier Certified", "Pre-tested"],
    side: "left",
  },
  {
    step: "02",
    icon: <MdOutlinePrecisionManufacturing className="text-3xl" />,
    title: "Manufacturing",
    desc: "Precision-controlled production on advanced machinery with strict parameter monitoring for consistent output and dimensional accuracy.",
    tags: ["Precision Control", "Advanced Machinery", "High Volume"],
    side: "right",
  },
  {
    step: "03",
    icon: <MdOutlineVerified className="text-3xl" />,
    title: "Quality Inspection",
    desc: "Multi-stage quality checks including dimensional verification, strength testing and visual inspection before goods move forward.",
    tags: ["Multi-Stage QC", "Strength Tested", "Visual Inspection"],
    side: "left",
  },
  {
    step: "04",
    icon: <MdOutlineInventory className="text-3xl" />,
    title: "Packaging",
    desc: "Finished goods are systematically packed, labelled and staged for dispatch — organised by order, client and specification.",
    tags: ["Systematically Packed", "Correctly Labelled", "Order Sorted"],
    side: "right",
  },
  {
    step: "05",
    icon: <MdOutlineLocalShipping className="text-3xl" />,
    title: "Dispatch",
    desc: "Timely dispatch with reliable logistics partners. Orders tracked through our delivery network for on-time arrival.",
    tags: ["On-Time Delivery", "Tracked Logistics", "Pan India"],
    side: "left",
  },
];

export default function QualityProcess() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const stepsRef   = useRef(null);
  const quoteRef   = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* header */
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      /* Each step slides in from its side */
      if (stepsRef.current) {
        Array.from(stepsRef.current.children).forEach((child, i) => {
          const fromX = i % 2 === 0 ? -60 : 60;
          gsap.fromTo(
            child,
            { x: fromX, opacity: 0 },
            {
              x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
              scrollTrigger: {
                trigger: child,
                start: "top 85%",
              },
            }
          );
        });
      }

      /* quote */
      gsap.fromTo(
        quoteRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 90%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)] overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, var(--secondary) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <span
            className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5"
          >
            Quality Process
          </span>
          <h2 className="section-heading-white mb-4">
            How We Ensure{" "}
            <span className="text-[var(--secondary)]">Zero-Compromise</span>{" "}
            Quality
          </h2>
          <p className="text-white/50 leading-relaxed text-sm">
            Our structured 5-step manufacturing process delivers consistent quality at
            every stage — from raw material intake to final dispatch.
          </p>
        </div>

        {/* ── Alternating timeline ── */}
        <div ref={stepsRef} className="relative max-w-5xl mx-auto">

          {/* Central vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-px" />

          {steps.map((s, i) => {
            const isLeft = i % 2 === 0; /* even = content on left side */
            return (
              <div
                key={i}
                className={`relative flex flex-col lg:flex-row items-center gap-0 mb-12 last:mb-0 ${
                  isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >

                {/* Content card */}
                <div
                  className={`flex-1 ${
                    isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                  }`}
                >
                  <div
                    className={`bg-white/[0.06] border border-white/10 p-7 hover:bg-white/[0.09] transition-all duration-300 group ${
                      isLeft ? "" : ""
                    }`}
                  >
                    {/* Title row */}
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        isLeft ? "lg:flex-row-reverse lg:justify-start" : ""
                      }`}
                    >
                      <div className="w-11 h-11 bg-[var(--secondary)]/15 border border-[var(--secondary)]/25 flex items-center justify-center text-[var(--secondary)] shrink-0">
                        {s.icon}
                      </div>
                      <h3 className="text-white">{s.title}</h3>
                    </div>

                    <p className="text-white/55 text-sm leading-relaxed mb-5">{s.desc}</p>

                    {/* Tags */}
                    <div
                      className={`flex flex-wrap gap-1.5 ${
                        isLeft ? "lg:justify-end" : ""
                      }`}
                    >
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--secondary)]/10 text-[var(--secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central step node */}
                <div className="relative z-10 flex flex-col items-center shrink-0 my-4 lg:my-0">
                  {/* Circle */}
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)] border-2 border-[var(--secondary)]/50 flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg font-black">{s.step}</span>
                  </div>
                  {/* Connector dot */}
                  <div className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-2 lg:hidden" />
                </div>

                {/* Spacer on the other side (desktop only) */}
                <div className="flex-1 hidden lg:block" />

              </div>
            );
          })}

        </div>

        {/* ── Bottom quote ── */}
        <div ref={quoteRef} className="mt-16 text-center border-t border-white/10 pt-10">
          <p className="text-white/35 text-sm max-w-lg mx-auto">
            Every batch is traceable from raw material to dispatch —
            <span className="text-white/70 font-semibold">
              {" "}quality is not checked at the end, it is built throughout.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
