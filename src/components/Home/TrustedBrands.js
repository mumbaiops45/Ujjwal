"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiStar } from "react-icons/fi";
import { FiAward, FiGlobe, FiUsers } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

const brands = [
  { name: "ArroTex India",     initial: "AT" },
  { name: "GlobalPack Co.",    initial: "GP" },
  { name: "StellarGarments",   initial: "SG" },
  { name: "IndoRetail Group",  initial: "IR" },
  { name: "PrimeFabrics Ltd.", initial: "PF" },
  { name: "NexLogistics",      initial: "NL" },
  { name: "ZenithTextiles",    initial: "ZT" },
  { name: "BrightExports",     initial: "BE" },
  { name: "CrestPack India",   initial: "CP" },
  { name: "FusionApparel",     initial: "FA" },
];

/* duplicate for seamless loop */
const row1 = [...brands, ...brands]; /* left → right  */
const row2 = [...brands, ...brands]; /* right → left  */

/* ── Animated counter ── */
function StatCounter({ end, suffix = "", label, icon }) {
  const [count, setCount] = useState(0);
  const ref     = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (end === null) { setCount(null); return; }
          const steps = 50;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(current));
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
      <span className="text-[var(--secondary)] mb-1">{icon}</span>
      <span className="text-3xl font-black text-[var(--primary)] leading-none tabular-nums">
        {end !== null ? `${count}${suffix}` : suffix}
      </span>
      <span className="text-[var(--accent)]/55 text-[10px] uppercase tracking-widest text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

const stats = [
  { end: 35,   suffix: "+",          label: "Years Experience",  icon: <FiAward className="text-xl" /> },
  { end: 100,  suffix: "+",          label: "Team Members",      icon: <FiUsers className="text-xl" /> },
  { end: null, suffix: "Pan India",  label: "Supply Network",    icon: <FiGlobe className="text-xl" /> },
  { end: null, suffix: "Export",     label: "Quality Standards", icon: <MdOutlineVerified className="text-xl" /> },
];

export default function TrustedBrands() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );

      if (statsRef.current) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { y: 30, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            stagger: 0.12, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
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

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12">
          <span
            className="inline-block text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] border-l-[3px] border-[var(--secondary)] pl-3 mb-5"
          >
            Trusted By Brands
          </span>
          <h2 className="section-heading mb-3">
            Brands That{" "}
            <span className="text-[var(--secondary)]">Trust Our Quality</span>
          </h2>
          <p className="text-[var(--accent)]/60 text-sm max-w-xl mx-auto leading-relaxed">
            Manufacturers, retailers and exporters across India rely on Ujjwal Poly Pack
            for consistent quality and dependable delivery.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="text-[var(--secondary)] fill-[var(--secondary)] text-sm" />
            ))}
            <span className="ml-3 text-sm text-[var(--accent)]/55 font-medium">
              Trusted manufacturing partner since 1989
            </span>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--primary)]/8 border border-[var(--primary)]/8 mb-14"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-white px-6 py-7 flex items-center justify-center">
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

      {/* ── Dual marquee (bleeds full width) ── */}
      <div className="relative w-full overflow-hidden flex flex-col gap-3">

        {/* Fade masks */}
        <div
          className="absolute top-0 left-0 h-full w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, white 0%, transparent 100%)" }}
        />
        <div
          className="absolute top-0 right-0 h-full w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, white 0%, transparent 100%)" }}
        />

        {/* Row 1: left → right */}
        <div className="marquee-track">
          {row1.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-4 px-6 py-3.5 border border-[var(--primary)]/10 grayscale hover:grayscale-0 hover:border-[var(--secondary)]/30 transition-all duration-300 cursor-default select-none shrink-0"
              style={{ minWidth: "175px" }}
            >
              <div className="w-8 h-8 bg-[var(--primary)]/8 flex items-center justify-center text-[var(--primary)] text-xs font-black shrink-0">
                {brand.initial}
              </div>
              <span className="text-sm font-semibold text-[var(--accent)]/55 whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2: right → left (reverse animation) */}
        <div
          className="flex w-max"
          style={{ animation: "marquee 32s linear infinite reverse" }}
        >
          {row2.map((brand, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-4 px-6 py-3.5 border border-[var(--primary)]/8 bg-[var(--primary)]/[0.02] grayscale hover:grayscale-0 hover:border-[var(--secondary)]/30 transition-all duration-300 cursor-default select-none shrink-0"
              style={{ minWidth: "175px" }}
            >
              <div className="w-8 h-8 bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] text-xs font-black shrink-0">
                {brand.initial}
              </div>
              <span className="text-sm font-semibold text-[var(--accent)]/50 whitespace-nowrap">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-10 text-center">
        <p className="text-xs text-[var(--accent)]/35 uppercase tracking-widest">
          Logos are placeholders — actual client brands to be added
        </p>
      </div>

    </section>
  );
}
