"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiArrowRight } from "react-icons/hi";
import { FiShield } from "react-icons/fi";
import {
  MdOutlineVerified,
  MdOutlineLocalShipping,
  MdOutlineExtension,
  MdOutlineHandshake,
} from "react-icons/md";
import { TbBuildingFactory } from "react-icons/tb";
import { FiAward } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon : <MdOutlineVerified className="text-2xl" />,
    title: "Zero Compromise Quality",
    desc : "Every product undergoes rigorous quality inspection across multiple production stages. No shortcuts, no exceptions.",
  },
  {
    icon : <MdOutlineLocalShipping className="text-2xl" />,
    title: "On Time Delivery",
    desc : "Reliable dispatch systems and logistics partnerships ensure your orders arrive on schedule, every time.",
  },
  {
    icon : <TbBuildingFactory className="text-2xl" />,
    title: "Trusted Manufacturing",
    desc : "35+ years of industrial manufacturing experience with an established facility and a skilled production team.",
  },
  {
    icon : <MdOutlineExtension className="text-2xl" />,
    title: "Custom Packaging",
    desc : "Flexible manufacturing capabilities to produce custom sizes, prints and specifications tailored to your exact needs.",
  },
  {
    icon : <MdOutlineHandshake className="text-2xl" />,
    title: "Long Term Reliability",
    desc : "We build client relationships that last. When we earn your business, our promise is to keep it — year after year.",
  },
  {
    icon : <FiAward className="text-2xl" />,
    title: "Industry Expertise",
    desc : "Deep domain expertise across packaging for apparel, FMCG, retail, logistics and industrial sectors.",
  },
];

export default function AboutMission() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const listRef    = useRef(null);
  const ctaRef     = useRef(null);

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

      if (listRef.current) {
        gsap.fromTo(
          Array.from(listRef.current.children),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: listRef.current, start: "top 78%" },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-heading">
              The{" "}
              <span className="text-[var(--secondary)]">Ujjwal Promise</span>
              {" "},{" "}
              <span className="text-[var(--primary)]">Reliability First</span>
            </h2>
          </div>
          <p className="text-[var(--accent)]/65 leading-relaxed text-sm max-w-sm">
            Global retail buyers demand zero compromise on quality, consistent
            accuracy and on-time delivery for every single order. Our clients
            depend on Ujjwal Poly Pack to deliver that, every time.
          </p>
        </div>

        {/* Numbered grid */}
        <div
          ref={listRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--primary)]/8"
        >
          {reasons.map((r, i) => (
            <div
              key={i}
              className={`group flex items-start gap-6 p-7 transition-all duration-300 hover:bg-[var(--primary)]/[0.025] border-b border-[var(--primary)]/8 last:border-b-0 lg:last:border-b-0 ${
                i % 2 === 0 ? "lg:border-r border-[var(--primary)]/8" : ""
              }`}
            >
              {/* Large number */}
              <span className="hidden md:block text-[56px] font-black leading-none text-[var(--primary)]/8 group-hover:text-[var(--secondary)]/18 transition-colors duration-500 select-none w-14 shrink-0 tabular-nums pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon box */}
              <div className="w-11 h-11 border border-[var(--primary)]/12 bg-[var(--primary)]/4 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--secondary)]/10 group-hover:border-[var(--secondary)]/25 group-hover:text-[var(--secondary)] transition-all duration-300 shrink-0 mt-1">
                {r.icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[var(--primary)] mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--accent)]/65 leading-relaxed">{r.desc}</p>
                <div className="h-px w-0 group-hover:w-full bg-[var(--secondary)]/35 transition-all duration-500 mt-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom promise strip */}
        <div
          ref={ctaRef}
          className="mt-10 bg-[var(--primary)] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4">
            <FiShield className="text-[var(--secondary)] text-2xl shrink-0" />
            <p className="text-white/70 text-sm leading-relaxed">
              <span className="text-white font-semibold">
                &ldquo;When we earn your business, our promise is to keep it.&rdquo;
              </span>
              {" "}: Ujjwal Poly Pack India Pvt. Ltd.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--secondary)] text-white text-sm font-bold uppercase tracking-wide hover:bg-[var(--secondary)]/90 transition-all duration-300 shrink-0"
          >
            Start a Conversation <HiArrowRight />
          </Link>
        </div>

      </div>
    </section>
  );
}
