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
import { FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    step: "01",
    icon: <MdOutlineInventory2 className="text-3xl" />,
    title: "Raw Material",
    desc: "Premium-grade PP, LDPE and HDPE granules sourced from certified suppliers. Every lot is tested for quality before entering production.",
    tags: ["Grade A Material", "Supplier Certified", "Pre-tested"],
  },
  {
    step: "02",
    icon: <MdOutlinePrecisionManufacturing className="text-3xl" />,
    title: "Manufacturing",
    desc: "Precision-controlled production on advanced machinery with strict parameter monitoring for consistent output and dimensional accuracy.",
    tags: ["Precision Control", "Advanced Machinery", "High Volume"],
  },
  {
    step: "03",
    icon: <MdOutlineVerified className="text-3xl" />,
    title: "Quality Inspection",
    desc: "Multi-stage quality checks including dimensional verification, strength testing and visual inspection before goods move forward.",
    tags: ["Multi-Stage QC", "Strength Tested", "Visual Inspection"],
  },
  {
    step: "04",
    icon: <MdOutlineInventory className="text-3xl" />,
    title: "Packaging",
    desc: "Finished goods are systematically packed, labelled and staged for dispatch  organised by order, client and specification.",
    tags: ["Systematically Packed", "Correctly Labelled", "Order Sorted"],
  },
  {
    step: "05",
    icon: <MdOutlineLocalShipping className="text-3xl" />,
    title: "Dispatch",
    desc: "Timely dispatch with reliable logistics partners. Orders tracked through our delivery network for on-time arrival.",
    tags: ["On-Time Delivery", "Tracked Logistics", "Pan India"],
  },
];

export default function QualityProcess() {
  const sectionRef      = useRef(null);
  const headerRef       = useRef(null);
  const desktopTopRef   = useRef(null); /* circles row  */
  const desktopCardsRef = useRef(null); /* cards row    */
  const mobileRef       = useRef(null); /* mobile steps */
  const quoteRef        = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── 1. Header fades up ── */
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      /* ── 2. Desktop: connector lines draw left→right ── */
      gsap.fromTo(
        ".qp-connector",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, stagger: 0.15, duration: 0.55, ease: "power2.inOut",
          scrollTrigger: { trigger: desktopTopRef.current, start: "top 82%" },
        }
      );

      /* ── 3. Desktop: step circles drop in from above ── */
      if (desktopTopRef.current) {
        gsap.fromTo(
          desktopTopRef.current.querySelectorAll(".qp-circle"),
          { y: -35, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: "back.out(1.4)",
            scrollTrigger: { trigger: desktopTopRef.current, start: "top 82%" },
          }
        );

        /* ── 4. Step number badges pop in ── */
        gsap.fromTo(
          desktopTopRef.current.querySelectorAll(".qp-badge"),
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, stagger: 0.12, duration: 0.45, ease: "back.out(2)",
            scrollTrigger: { trigger: desktopTopRef.current, start: "top 80%" },
            delay: 0.35,
          }
        );
      }

      /* ── 5. Desktop: cards stagger up ── */
      if (desktopCardsRef.current) {
        gsap.fromTo(
          Array.from(desktopCardsRef.current.children),
          { y: 45, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: desktopCardsRef.current, start: "top 85%" },
          }
        );
      }

      /* ── 6. Mobile: step items stagger from left ── */
      if (mobileRef.current) {
        gsap.fromTo(
          Array.from(mobileRef.current.children),
          { x: -40, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: mobileRef.current, start: "top 80%" },
          }
        );
      }

      /* ── 7. Bottom quote fades up ── */
      gsap.fromTo(
        quoteRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: quoteRef.current, start: "top 92%" },
        }
      );

    }, sectionRef); /* scope all selectors to the section */

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--primary)]/4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── header ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label" style={{ borderLeft: "3px solid var(--secondary)", display: "inline-block" }}>
            Quality Process
          </span>
          <h2 className="section-heading mt-2 mb-4">
            How We Ensure{" "}
            <span className="text-[var(--secondary)]">Zero-Compromise</span>{" "}
            Quality
          </h2>
          <p className="text-[var(--accent)]/65 leading-relaxed text-sm">
            Our structured 5-step manufacturing process is designed to deliver
            consistent quality at every stage  from raw material intake to
            final dispatch.
          </p>
        </div>

        {/* ── desktop horizontal timeline ── */}
        <div className="hidden lg:block">

          {/* circles row */}
          <div ref={desktopTopRef} className="relative flex items-start gap-0 mb-0">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 relative">

                {/* connector line — animated via .qp-connector */}
                {i < steps.length - 1 && (
                  <div className="absolute top-7 left-1/2 w-full h-px z-0">
                    <div
                      className="qp-connector h-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--secondary), var(--primary))",
                        opacity: 0.25,
                      }}
                    />
                  </div>
                )}

                {/* step circle — animated via .qp-circle */}
                <div className="qp-circle relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[var(--primary)] border-2 border-[var(--secondary)]/40 flex items-center justify-center text-[var(--secondary)] shadow-lg">
                    {s.icon}
                  </div>
                  {/* number badge — animated via .qp-badge */}
                  <div className="qp-badge absolute -top-2 -right-1 w-5 h-5 bg-[var(--secondary)] rounded-full flex items-center justify-center text-white text-[9px] font-black">
                    {s.step}
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* cards below circles */}
          <div ref={desktopCardsRef} className="flex gap-4 mt-8">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex-1 bg-white border border-[var(--primary)]/8 p-6 hover:border-[var(--secondary)]/30 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-[var(--primary)] mb-2">{s.title}</h4>
                <p className="text-xs text-[var(--accent)]/65 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-[var(--secondary)]/8 text-[var(--secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── mobile vertical timeline ── */}
        <div ref={mobileRef} className="lg:hidden flex flex-col gap-0">
          {steps.map((s, i) => (
            <div key={i} className="relative flex gap-5">

              {/* left rail */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] border-2 border-[var(--secondary)]/40 flex items-center justify-center text-[var(--secondary)] shrink-0 relative z-10">
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 mt-2 mb-2"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--secondary)/30, var(--primary)/20)",
                      opacity: 0.4,
                      minHeight: "24px",
                    }}
                  />
                )}
              </div>

              {/* card */}
              <div className="flex-1 bg-white border border-[var(--primary)]/8 p-5 mb-4 hover:border-[var(--secondary)]/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-black text-[var(--secondary)] uppercase tracking-widest">
                    Step {s.step}
                  </span>
                  <FiCheckCircle className="text-[var(--secondary)] text-xs" />
                </div>
                <h4 className="text-[var(--primary)] mb-2">{s.title}</h4>
                <p className="text-xs text-[var(--accent)]/65 leading-relaxed mb-3">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-[var(--secondary)]/8 text-[var(--secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── bottom trust statement ── */}
        <div ref={quoteRef} className="mt-14 text-center">
          <p className="text-[var(--accent)]/50 text-sm">
            Every batch is traceable from raw material to dispatch —
            <span className="text-[var(--primary)] font-semibold">
              {" "}quality is not checked at the end, it is built throughout.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
