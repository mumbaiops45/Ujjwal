"use client";

import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function AboutCTA() {
  return (
    <section className="py-24 bg-[var(--primary)]">
      <div className="max-w-5xl mx-auto px-6 text-center">

        <p className="text-[var(--secondary)] uppercase tracking-[0.25em] text-xs font-bold mb-5">
          Let's Work Together
        </p>

        <h2 className="text-white text-4xl lg:text-6xl font-black leading-tight mb-6">
          Trusted Manufacturing Partner
          Across India
        </h2>

        <p className="text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
          From industrial packaging to garment trim manufacturing,
          Ujjwal Poly Pack delivers scalable quality with reliability.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--secondary)] text-white font-bold uppercase tracking-wider hover:scale-105 transition-all duration-300"
        >
          Contact Us
          <HiArrowRight />
        </Link>

      </div>
    </section>
  );
}