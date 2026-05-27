"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutIntro() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".introAnim",
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="introAnim section-label">
              Our Story
            </p>

            <h2 className="introAnim section-heading mb-6">
              Engineering Packaging &
              <span className="text-[var(--secondary)]">
                {" "}Garment Trim Solutions
              </span>
            </h2>

            <p className="introAnim text-[var(--accent)]/70 leading-relaxed mb-6">
              Ujjwal Poly Pack India Pvt. Ltd. has built a reputation for
              manufacturing premium industrial packaging and garment trim
              products trusted by exporters, retail brands and textile
              manufacturers across India.
            </p>

            <p className="introAnim text-[var(--accent)]/65 leading-relaxed">
              With decades of manufacturing expertise, advanced infrastructure
              and strict quality systems, we continue to deliver scalable,
              reliable and export-ready production solutions.
            </p>
          </div>

          {/* Right */}
          <div className="relative h-[500px] overflow-hidden">
            <img
              src="/about/about-intro.jpg"
              alt="Factory"
              className="w-full h-full object-cover rounded-sm"
            />
          </div>

        </div>
      </div>
    </section>
  );
}