"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight, HiOutlinePhone } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";
import { FiMail } from "react-icons/fi";

const trustPoints = [
  "35+ Years Experience",
  "Export Quality Manufacturing",
  "Pan India Supply",
  "Zero Compromise Quality",
];

export default function CTABanner() {
  const sectionRef  = useRef(null);
  const labelRef    = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const btnsRef     = useRef(null);
  const pillsRef    = useRef(null);
  const contactRef  = useRef(null);
  const quoteRef    = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.fromTo(
        labelRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      tl.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        Array.from(btnsRef.current.children),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.55, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        Array.from(pillsRef.current.children),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      );

      tl.fromTo(
        contactRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.2"
      );

      tl.fromTo(
        quoteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[var(--primary)] py-28">

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-30" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--secondary)]" />

      {/* Glow blob — top right */}
      <div
        className="absolute top-0 right-0 w-[450px] h-[450px] opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 70% 25%, var(--secondary) 0%, transparent 65%)",
        }}
      />

      {/* Glow blob — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[320px] h-[320px] opacity-8 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 75%, var(--secondary) 0%, transparent 65%)",
        }}
      />

      {/* Diagonal decorative line */}
      <div
        className="absolute inset-y-0 left-1/2 w-px opacity-5 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--secondary) 50%, transparent 100%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

        {/* ── Label ── */}
        <span
          ref={labelRef}
          className="inline-flex items-center gap-2 text-[var(--secondary)] text-[11px] font-bold uppercase tracking-[0.22em] mb-6"
        >
          <MdOutlineVerified className="text-base" />
          Get In Touch · Request A Quote
        </span>

        {/* ── Main heading ── */}
        <h2
          ref={headingRef}
          className="section-heading-white mb-6 text-center"
          style={{ fontSize: "clamp(32px,5vw,52px)" }}
        >
          Built For{" "}
          <span className="text-[var(--secondary)]">Quality</span>
          .{" "}
          Delivered{" "}
          <span className="text-[var(--secondary)]">On Time</span>.
        </h2>

        {/* ── Sub copy ── */}
        <p
          ref={subRef}
          className="text-white/60 leading-relaxed text-sm sm:text-base mb-4 max-w-xl mx-auto"
        >
          Ready to discuss bulk orders, custom specifications and new product requirements.
          Speak with our team for a tailored packaging solution for your business.
        </p>

        <p className="text-white/35 leading-relaxed text-sm mb-10 max-w-xl mx-auto">
          We are not just a packaging supplier. We are a long-term manufacturing partner
          committed to your growth, your timelines and your quality standards.
        </p>

        {/* ── CTA Buttons ── */}
        <div
          ref={btnsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-enquiry-modal"))}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--secondary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)]/90 transition-all duration-300 group w-full sm:w-auto justify-center"
          >
            Request A Quote
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-wide hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-all duration-300 group w-full sm:w-auto justify-center backdrop-blur-sm"
          >
            Explore Products
            <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* ── Trust pills ── */}
        <div
          ref={pillsRef}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {trustPoints.map((tp) => (
            <span
              key={tp}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 border border-white/12 text-white/55 hover:border-[var(--secondary)]/40 hover:text-white/75 transition-all duration-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--secondary)] shrink-0" />
              {tp}
            </span>
          ))}
        </div>

        {/* ── Contact chips ── */}
        <div
          ref={contactRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
        >
          <a
            href="tel:+91"
            className="flex items-center gap-2.5 text-white/40 hover:text-[var(--secondary)] transition-colors duration-300"
          >
            <HiOutlinePhone className="text-base shrink-0" />
            <span>Call Our Manufacturing Team</span>
          </a>
          <span className="hidden sm:block w-px h-4 bg-white/15" />
          <a
            href="mailto:info@ujjwals.com"
            className="flex items-center gap-2.5 text-white/40 hover:text-[var(--secondary)] transition-colors duration-300"
          >
            <FiMail className="text-base shrink-0" />
            <span>info@ujjwals.com</span>
          </a>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div
        ref={quoteRef}
        className="relative mt-20 pt-8 border-t border-white/10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-white/25 text-xs uppercase tracking-[0.2em] text-center sm:text-left">
          Ujjwal Poly Pack India Pvt. Ltd. · Bengaluru, Karnataka
        </p>
        <p className="text-white/20 text-xs italic text-center sm:text-right">
          &ldquo;When we earn your business, our promise is to keep it.&rdquo;
        </p>
      </div>

    </section>
  );
}
