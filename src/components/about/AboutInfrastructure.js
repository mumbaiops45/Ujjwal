"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutInfrastructure() {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.to(imageRef.current, {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      <img
        ref={imageRef}
        src="/about/factory.jpg"
        alt="Infrastructure"
        className="absolute inset-0 w-full h-[120%] object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <p className="text-[var(--secondary)] uppercase tracking-[0.25em] text-xs font-bold mb-5">
              Infrastructure
            </p>

            <h2 className="text-white text-4xl lg:text-6xl font-black leading-tight mb-6">
              Advanced Manufacturing Infrastructure
            </h2>

            <p className="text-white/70 leading-relaxed">
              High-capacity machinery, quality-driven production systems
              and engineered workflows designed for industrial-scale output.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}