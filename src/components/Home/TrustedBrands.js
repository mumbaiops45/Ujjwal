"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiStar } from "react-icons/fi";
import { FiAward, FiGlobe, FiUsers } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   GARMENT TRIM CLIENTS
───────────────────────────────────────────────────────────── */
const garmentClients = [
  { name: "Nike", initial: "NK" },
  { name: "Zara", initial: "ZR" },
  { name: "M&S", initial: "MS" },
  { name: "Amazon", initial: "AM" },

  { name: "Shahi Exports Pvt. Ltd.", initial: "SE" },
  { name: "Texport Overseas Pvt. Ltd.", initial: "TO" },
  { name: "Texport Industries Pvt. Ltd.", initial: "TI" },
  { name: "Aditya Birla Group", initial: "AB" },
  { name: "Arvind Limited", initial: "AL" },
  { name: "Gokaldas Exports Pvt. Ltd.", initial: "GE" },
  { name: "Raymond UCO Denim Pvt. Ltd.", initial: "RD" },
];

/* duplicate for infinite marquee */
const row1 = [...garmentClients, ...garmentClients];
const row2 = [...garmentClients, ...garmentClients];

/* ─────────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────────── */
const stats = [
  {
    end: 35,
    suffix: "+",
    label: "Years Experience",
    icon: <FiAward className="text-xl" />,
  },
  {
    end: 100,
    suffix: "+",
    label: "Team Members",
    icon: <FiUsers className="text-xl" />,
  },
  {
    end: null,
    suffix: "Pan India",
    label: "Supply Network",
    icon: <FiGlobe className="text-xl" />,
  },
  {
    end: null,
    suffix: "Export",
    label: "Quality Standards",
    icon: <MdOutlineVerified className="text-xl" />,
  },
];

/* ─────────────────────────────────────────────────────────────
   COUNTER
───────────────────────────────────────────────────────────── */
function StatCounter({ end, suffix = "", label, icon }) {
  const [count, setCount] = useState(0);

  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          if (end === null) {
            setCount(null);
            return;
          }

          const steps = 50;
          const increment = end / steps;

          let current = 0;

          const timer = setInterval(() => {
            current += increment;

            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 1800 / steps);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="text-[var(--secondary)] mb-1">
        {icon}
      </span>

      <span className="text-3xl font-black text-[var(--primary)] leading-none tabular-nums">
        {end !== null ? `${count}${suffix}` : suffix}
      </span>

      <span className="text-[var(--accent)]/55 text-[10px] uppercase tracking-widest text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
export default function TrustedBrands() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Header animation */
      gsap.fromTo(
        headerRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",

          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      /* Stats stagger animation */
      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          {
            y: 30,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,

            stagger: 0.12,
            duration: 0.55,
            ease: "power3.out",

            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%",
            },
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white border-y border-[var(--primary)]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <div ref={headerRef} className="text-center mb-12">

          <span
            className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5"
          >
            Trusted By Brands
          </span>

          <h2 className="section-heading mb-3">
            Leading Brands Using Our{" "}
            <span className="text-[var(--secondary)]">
              Garment Trim Solutions
            </span>
          </h2>

          <p className="text-[var(--accent)]/60 text-sm max-w-2xl mx-auto leading-relaxed">
            Ujjwal Poly Pack manufactures premium elastic products and garment
            trims trusted by leading apparel exporters, global fashion brands,
            textile manufacturers and retail supply chains.
          </p>

          {/* STARS */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className="text-[var(--secondary)] fill-[var(--secondary)] text-sm"
              />
            ))}

            <span className="ml-3 text-sm text-[var(--accent)]/55 font-medium">
              Trusted manufacturing partner since 1989
            </span>
          </div>
        </div>

        {/* STATS */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--primary)]/8 border border-[var(--primary)]/8 mb-14"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white px-6 py-7 flex items-center justify-center"
            >
              <StatCounter
                end={s.end}
                suffix={s.suffix}
                label={s.label}
                icon={s.icon}
              />
            </div>
          ))}
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────
          MAIN TITLE
      ───────────────────────────────────────────────────── */}
      <div className="text-center mb-8 px-4">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--secondary)] font-bold mb-2">
          E L A S T I C &nbsp; P R O D U C T S &nbsp; & &nbsp; G A R M E N T &nbsp; T R I M
        </p>

        <h3 className="text-2xl lg:text-3xl font-black text-[var(--primary)]">
          Key Manufacturing Customers & Associated Brands
        </h3>
      </div>

      {/* ─────────────────────────────────────────────────────
          MARQUEE SECTION
      ───────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4">

        {/* LEFT FADE */}
        <div
          className="absolute top-0 left-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, white 0%, transparent 100%)",
          }}
        />

        {/* RIGHT FADE */}
        <div
          className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(270deg, white 0%, transparent 100%)",
          }}
        />

        {/* ROW 1 */}
        <div
          className="flex w-max"
          style={{
            animation: "marquee 34s linear infinite",
          }}
        >
          {row1.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-4 px-6 py-4 border border-[var(--primary)]/10 bg-white hover:bg-[var(--primary)] transition-all duration-300 group cursor-default shrink-0"
              style={{ minWidth: "230px" }}
            >
              {/* INITIAL */}
              <div className="w-10 h-10 bg-[var(--secondary)]/12 flex items-center justify-center text-[var(--secondary)] text-sm font-black shrink-0 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
                {brand.initial}
              </div>

              {/* NAME */}
              <span className="text-sm font-semibold text-[var(--accent)]/70 whitespace-nowrap group-hover:text-white transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* ROW 2 */}
        <div
          className="flex w-max"
          style={{
            animation: "marquee 40s linear infinite reverse",
          }}
        >
          {row2.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-4 px-6 py-4 border border-[var(--primary)]/8 bg-[var(--primary)]/[0.02] hover:bg-[var(--secondary)] transition-all duration-300 group cursor-default shrink-0"
              style={{ minWidth: "230px" }}
            >
              {/* INITIAL */}
              <div className="w-10 h-10 bg-[var(--primary)]/8 flex items-center justify-center text-[var(--primary)] text-sm font-black shrink-0 group-hover:bg-white/15 group-hover:text-white transition-all duration-300">
                {brand.initial}
              </div>

              {/* NAME */}
              <span className="text-sm font-semibold text-[var(--accent)]/60 whitespace-nowrap group-hover:text-white transition-colors duration-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* FOOTER NOTE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 text-center">
        <p className="text-xs text-[var(--accent)]/35 uppercase tracking-widest">
          Elastic products, woven trims, garment accessories and industrial packaging solutions
        </p>
      </div>

      {/* GLOBAL MARQUEE CSS */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}