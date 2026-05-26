"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import { HiArrowRight, HiOutlinePhone } from "react-icons/hi";
import { MdOutlineFactory, MdOutlineVerified } from "react-icons/md";
import { FiAward, FiGlobe, FiUsers } from "react-icons/fi";

/* ── animated counter ──────────────────────────────────────── */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
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
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

const stats = [
  { value: 35, suffix: "+", label: "Years Experience", icon: <FiAward className="text-2xl" /> },
  { value: 100, suffix: "+", label: "Team Members", icon: <FiUsers className="text-2xl" /> },
  { value: null, label: "Pan India Supply", icon: <FiGlobe className="text-2xl" />, text: "Pan India" },
  { value: null, label: "Export Quality Standards", icon: <MdOutlineVerified className="text-2xl" />, text: "Export Grade" },
];

export default function Hero() {
  const heroRef    = useRef(null);
  const videoRef   = useRef(null);
  const overlayRef = useRef(null);
  const labelRef   = useRef(null);
  const headingRef = useRef(null);
  const descRef    = useRef(null);
  const buttonRef  = useRef(null);
  const phoneRef   = useRef(null);
  const statsRef   = useRef(null);

  useEffect(() => {
    // gsap.context() scopes all animations and ctx.revert() cleanly
    // removes every inline style — fixes React Strict Mode double-invoke.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      /* video zoom intro */
      tl.fromTo(
        videoRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      /* overlay fade */
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=1.5"
      );

      /* top label */
      tl.fromTo(
        labelRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=1"
      );

      /* heading */
      tl.fromTo(
        headingRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.5"
      );

      /* paragraph */
      tl.fromTo(
        descRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.7"
      );

      /* buttons — use fromTo so end state (opacity:1) is always explicit */
      tl.fromTo(
        Array.from(buttonRef.current.children),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      /* phone strip */
      tl.fromTo(
        phoneRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      );

      /* stats stagger */
      tl.fromTo(
        Array.from(statsRef.current.children),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      {/* background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="w-full h-full object-cover"
        >
          <source src="/polyethyne.mp4" type="video/mp4" />
        </video>
      </div>

      {/* primary gradient overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(16,47,103,0.96) 0%, rgba(16,47,103,0.55) 70%, rgba(16,47,103,0.60) 100%)",
        }}
      />

      {/* dark tone overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />

      {/* glow blob */}
      <div
        className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--secondary) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-28 w-full">

        <div className="max-w-3xl">

          {/* badge */}
          <span
            ref={labelRef}
            className="inline-flex items-center gap-2 text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-[var(--secondary)]/30 px-4 py-1.5 backdrop-blur-sm bg-white/5"
          >
            <MdOutlineFactory className="text-base" />
            Est. 1989 · Flexible Packaging Manufacturer
          </span>

          {/* heading */}
          <h1
            ref={headingRef}
            className="text-white text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.03em] mb-6"
          >
            Engineering{" "}
            <span className="text-[var(--secondary)]">Flexible</span>{" "}
            Packaging<br className="hidden sm:block" /> For{" "}
            <span className="text-[var(--secondary)]">Modern</span>{" "}
            Industry
          </h1>

          {/* description */}
          <p
            ref={descRef}
            className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Ujjwal Poly Pack India Pvt. Ltd. is a trusted B2B manufacturing partner
            specializing in industrial packaging and garment trim solutions — built on
            35+ years of precision engineering and zero‑compromise quality standards.
          </p>

          {/* buttons */}
          <div ref={buttonRef} className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--secondary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)]/90 transition-all duration-300"
            >
              Request Quote <HiArrowRight />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/25 text-white text-sm font-bold uppercase tracking-wide hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300 backdrop-blur-sm"
            >
              View Products <HiArrowRight />
            </Link>
          </div>

          {/* phone strip */}
          <div
            ref={phoneRef}
            className="mt-10 flex flex-wrap items-center gap-3 text-white/60 text-sm"
          >
            <HiOutlinePhone className="text-[var(--secondary)] text-lg" />
            <span>Speak with our manufacturing team</span>
            <span className="text-[var(--secondary)] font-semibold">Mon – Sat</span>
          </div>

        </div>

        {/* stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 bg-white/10 backdrop-blur-sm"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[rgba(16,47,103,0.72)] px-6 py-8 flex flex-col items-start gap-2 border border-white/5 hover:bg-[rgba(16,47,103,0.85)] transition-colors duration-300"
            >
              <span className="text-[var(--secondary)]">{s.icon}</span>
              <div className="text-3xl font-black text-white leading-none">
                {s.value !== null
                  ? <Counter end={s.value} suffix={s.suffix} />
                  : s.text}
              </div>
              <p className="text-white/50 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
