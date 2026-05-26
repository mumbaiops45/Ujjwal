"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight } from "react-icons/hi";
import { MdOutlineFactory, MdOutlineVerified } from "react-icons/md";
import { FiAward, FiCheckCircle } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

const strengths = [
  "35+ Years of manufacturing excellence",
  "Export quality production standards",
  "Pan India supply capability",
  "Engineering-driven process control",
  "Zero-compromise quality assurance",
  "Reliable long-term client partnerships",
];

const highlightCards = [
  {
    icon: <FiAward className="text-2xl" />,
    value: "Est. 1989",
    label: "Three decades of industrial manufacturing heritage",
  },
  {
    icon: <MdOutlineVerified className="text-2xl" />,
    value: "Export Quality",
    label: "Standards aligned with global packaging requirements",
  },
  {
    icon: <TbTruckDelivery className="text-2xl" />,
    value: "Pan India Supply",
    label: "Seamless delivery network across all major cities",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);
  const listRef    = useRef(null);
  const cardsRef   = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* left panel slides in from left */
      gsap.fromTo(
        leftRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      /* right panel slides in from right */
      gsap.fromTo(
        rightRef.current,
        { x: 70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      /* strength list stagger */
      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { y: 18, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.07, duration: 0.45, ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 82%" },
          }
        );
      }

      /* bottom highlight cards */
      if (cardsRef.current) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power3.out",
            scrollTrigger: { trigger: cardsRef.current, start: "top 88%" },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24">

        {/* ── Main two-panel block ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] overflow-hidden shadow-2xl">

          {/* ── Left: Company identity panel ── */}
          <div
            ref={leftRef}
            className="relative bg-[var(--primary)] p-10 lg:p-12 flex flex-col justify-between min-h-[460px] overflow-hidden"
          >
            {/* Background factory silhouette */}
            <MdOutlineFactory className="absolute -bottom-4 -right-4 text-[220px] text-white/[0.04] pointer-events-none select-none" />

            {/* Background grid pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

            {/* Secondary glow blob */}
            <div
              className="absolute top-0 right-0 w-48 h-48 opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)" }}
            />

            {/* Top: brand block */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[var(--secondary)] text-[10px] font-bold uppercase tracking-[0.25em] border border-[var(--secondary)]/30 px-3 py-1.5 mb-8">
                <FiAward className="text-xs" />
                Est. 1989
              </span>

              <h3 className="text-white text-4xl sm:text-5xl font-black leading-[1.0] mb-5">
                Ujjwal<br />
                <span className="text-[var(--secondary)]">Poly Pack</span><br />
                India Pvt. Ltd.
              </h3>

              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                A trusted industrial manufacturing partner delivering flexible packaging
                and garment trim solutions for over three decades.
              </p>
            </div>

            {/* Bottom: quick stats */}
            <div className="relative z-10 grid grid-cols-3 gap-3 mt-10 pt-8 border-t border-white/10">
              {[
                { num: "35+",  lbl: "Years"     },
                { num: "100+", lbl: "Team"      },
                { num: "2",    lbl: "Divisions" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-black text-white leading-none">{s.num}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Content ── */}
          <div
            ref={rightRef}
            className="bg-white p-10 lg:p-12 flex flex-col justify-center border border-[var(--primary)]/8 lg:border-l-0"
          >
            <span className="section-label">About The Company</span>

            <h2 className="section-heading mb-5">
              A Trusted{" "}
              <span className="text-[var(--secondary)]">Industrial</span>{" "}
              Manufacturing Partner Since{" "}
              <span className="text-[var(--secondary)]">1989</span>
            </h2>

            <p className="text-[var(--accent)]/80 leading-relaxed mb-4">
              Ujjwal Poly Pack India Pvt. Ltd. is a leading manufacturer, supplier and exporter
              of flexible packaging solutions and garment trim products. Since our founding in
              1989, we have built a reputation for engineering-driven production, consistent
              quality and dependable delivery.
            </p>

            <p className="text-[var(--accent)]/80 leading-relaxed mb-8">
              We operate with an industrial-scale manufacturing infrastructure serving apparel
              brands, retail companies, FMCG manufacturers and industrial businesses across
              India and beyond. Our philosophy is simple: when we earn your business, our
              promise is to keep it.
            </p>

            {/* strength checklist */}
            <ul ref={listRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <FiCheckCircle className="text-[var(--secondary)] text-base mt-0.5 shrink-0" />
                  <span className="text-sm text-[var(--accent)]/75">{s}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)] transition-all duration-300"
              >
                Our Story <HiArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--primary)]/25 text-[var(--primary)] text-sm font-bold uppercase tracking-wide hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300"
              >
                Get In Touch
              </Link>
            </div>
          </div>

        </div>

        {/* ── Highlight cards strip (flush under the panels) ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--primary)]/8 border border-t-0 border-[var(--primary)]/8 mb-24"
        >
          {highlightCards.map((h, i) => (
            <div
              key={i}
              className="bg-white px-8 py-7 flex items-start gap-4 group hover:bg-[var(--primary)] transition-all duration-300 cursor-default"
            >
              <span className="text-[var(--secondary)] group-hover:text-white transition-colors duration-300 mt-0.5 shrink-0">
                {h.icon}
              </span>
              <div>
                <h4 className="text-[var(--primary)] group-hover:text-white transition-colors duration-300 mb-1">
                  {h.value}
                </h4>
                <p className="text-[var(--accent)]/70 group-hover:text-white/65 transition-colors duration-300 text-sm">
                  {h.label}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
