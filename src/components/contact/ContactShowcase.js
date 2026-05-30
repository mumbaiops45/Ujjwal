"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FiPhone, FiMail, FiMapPin, FiGlobe,
  FiSend, FiCheckCircle, FiAlertCircle,
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

/* ─── contact detail cards (right side — unchanged) ─────────── */
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

/* ─── small reusable input / textarea wrapper ─────────────────── */
function Field({ label, children }) {
  return (
    <div className="form-field flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]/40">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-[var(--primary)]/15 bg-white px-4 py-3 text-sm text-[var(--primary)] " +
  "placeholder:text-[var(--accent)]/28 focus:outline-none focus:border-[var(--secondary)] " +
  "transition-colors duration-200";

/* ─── main component ─────────────────────────────────────────── */
export default function ContactShowcase() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const secRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  /* form submit → formsubmit.co (no backend needed) */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
     const res = await fetch(
  "https://formsubmit.co/ajax/info@ujjwals.com",
  {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: new FormData(e.target),
  }
);
      if (res.ok) {
        setStatus("sent");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* parallel x — both columns fire simultaneously */
      gsap.fromTo(
        leftRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 72%" }
        }
      );
      gsap.fromTo(
        rightRef.current,
        { x: 70, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: secRef.current, start: "top 72%" }
        }
      );

      /* form fields stagger in after the column slides into place */
      gsap.fromTo(
        ".form-field",
        { y: 14, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.08, duration: 0.45, ease: "power2.out",
          scrollTrigger: { trigger: secRef.current, start: "top 68%" },
          delay: 0.35,
        }
      );

    }, secRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secRef} className="bg-white py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT: enquiry form ── */}
          <div ref={leftRef}>
            <span className="section-label">Enquiry Form</span>
            <h2 className="section-heading mt-3 mb-8">
              Send Us a{" "}
              <span className="text-[var(--secondary)]">Message</span>
            </h2>

            {status === "sent" ? (
              /* success state */
              <div className="flex flex-col items-center justify-center gap-4 py-16 border border-[var(--secondary)]/25 bg-[var(--secondary)]/4 text-center">
                <FiCheckCircle className="text-[var(--secondary)] text-4xl" />
                <p className="text-[var(--primary)] font-bold text-base">Message Sent!</p>
                <p className="text-[var(--accent)]/55 text-sm max-w-xs">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs font-bold uppercase tracking-wider text-[var(--secondary)] hover:underline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* hidden fields for formsubmit.co */}
                <input type="hidden" name="_subject" value="New Enquiry — Ujjwal Poly Pack Website" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name *">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 XXXXX XXXXX"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Email Address *">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className={inputCls}
                  />
                </Field>

                <Field label="Company / Business Name">
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    className={inputCls}
                  />
                </Field>

                <Field label="Message / Enquiry *">
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your product requirement, quantity or any specific details..."
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-xs">
                    <FiAlertCircle className="shrink-0" />
                    Something went wrong. Please try emailing us directly at info@ujjwals.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="form-field w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wide py-3.5 hover:bg-[var(--secondary)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    "Sending…"
                  ) : (
                    <>Send Enquiry <FiSend className="text-base" /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── RIGHT: contact detail cards (unchanged) ── */}
          <div ref={rightRef}>
            <span className="section-label">Contact Details</span>
            <h2 className="section-heading mt-3 mb-8">
              Get In{" "}
              <span className="text-[var(--secondary)]">Touch</span>
            </h2>

            <div className="space-y-px border border-[var(--primary)]/8 overflow-hidden">
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

            <div className="mt-6 pt-6 border-t border-[var(--primary)]/8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]/35 mb-0.5">
                Ujjwal Poly Pack India Pvt. Ltd.
              </p>
              <p className="text-[10px] text-[var(--accent)]/28 uppercase tracking-wider">
                Est. 1989 &nbsp;·&nbsp; Bengaluru, Karnataka
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
