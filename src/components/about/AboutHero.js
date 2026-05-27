"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutHero() {
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      subRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="relative h-[30vh] flex items-center justify-center overflow-hidden bg-[var(--secondary)]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/about/about-hero.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <p
          ref={subRef}
          className="text-[var(--secondary)] uppercase tracking-[0.3em] text-xs font-bold mb-6"
        >
          Ujjwal Poly Pack India Pvt. Ltd.
        </p>

        <h1
          ref={titleRef}
          className="text-white text-5xl sm:text-7xl lg:text-8xl font-black leading-none"
        >
          About Us
        </h1>
      </div>
    </section>
  );
}