"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FiPhone, FiMail, FiMapPin, FiGlobe } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const details = [
  {
    icon: <FiPhone className="text-xl" />,
    label: "Phone",
    value: "+91 98450 12345",
    href: "tel:+919845012345",
  },
  {
    icon: <FiMail className="text-xl" />,
    label: "Email",
    value: "info@ujjwals.com",
    href: "mailto:info@ujjwals.com",
  },
  {
    icon: <FiMapPin className="text-xl" />,
    label: "Address",
    value: "Bengaluru, Karnataka, India",
    href: null,
  },
  {
    icon: <FiGlobe className="text-xl" />,
    label: "Website",
    value: "www.ujjwals.com",
    href: "https://www.ujjwals.com",
  },
];

export default function ContactShowcase() {
  const secRef   = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* parallel x — both sides fire at the same scroll point */
      gsap.fromTo(
        leftRef.current,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 72%" } }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 72%" } }
      );
    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-white py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div ref={leftRef}>
            <span className="section-label">Contact Us</span>
            <h2 className="section-heading mt-3 mb-5">
              Get In{" "}
              <span className="text-[var(--secondary)]">Touch</span>
            </h2>
            <p className="text-[var(--accent)]/60 leading-[1.8] text-sm max-w-sm">
              Reach out for bulk order enquiries, custom product specifications
              or any supply requirements. Our team is ready to assist.
            </p>

            <div className="mt-8 pt-8 border-t border-[var(--primary)]/8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]/35 mb-1">
                Ujjwal Poly Pack India Pvt. Ltd.
              </p>
              <p className="text-[10px] text-[var(--accent)]/30 uppercase tracking-wider">
                Est. 1989 &nbsp;·&nbsp; Bengaluru, Karnataka
              </p>
            </div>
          </div>

          {/* RIGHT — contact detail cards */}
          <div ref={rightRef} className="space-y-px border border-[var(--primary)]/8 overflow-hidden">
            {details.map((d) => {
              const Inner = (
                <div className="group flex items-center gap-5 px-6 py-5 bg-white hover:bg-[var(--primary)]/[0.03] border-b border-[var(--primary)]/8 last:border-b-0 transition-all duration-300">
                  <div className="w-11 h-11 flex items-center justify-center border border-[var(--primary)]/12 bg-[var(--primary)]/4 text-[var(--primary)] group-hover:bg-[var(--secondary)]/10 group-hover:border-[var(--secondary)]/25 group-hover:text-[var(--secondary)] transition-all duration-300 shrink-0">
                    {d.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]/35 mb-0.5">
                      {d.label}
                    </p>
                    <p className="text-[var(--primary)] font-semibold text-sm group-hover:text-[var(--secondary)] transition-colors duration-300 truncate">
                      {d.value}
                    </p>
                  </div>
                </div>
              );

              return d.href ? (
                <a
                  key={d.label}
                  href={d.href}
                  target={d.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {Inner}
                </a>
              ) : (
                <div key={d.label}>{Inner}</div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
