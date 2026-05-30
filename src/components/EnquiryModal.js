"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FiX, FiSend, FiCheckCircle, FiAlertCircle,
  FiPhone, FiMail,
} from "react-icons/fi";

/* ─── helpers ────────────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
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

/* ─── modal ──────────────────────────────────────────────────── */
export default function EnquiryModal() {
  const [open,   setOpen]   = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const backdropRef = useRef(null);
  const panelRef    = useRef(null);

  /* listen for the global open event fired by any button */
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-enquiry-modal", handler);
    return () => window.removeEventListener("open-enquiry-modal", handler);
  }, []);

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* entrance animation whenever modal opens */
  useEffect(() => {
    if (!open || !backdropRef.current || !panelRef.current) return;
    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
    gsap.fromTo(panelRef.current,
      { y: 44, opacity: 0, scale: 0.96 },
      { y: 0,  opacity: 1, scale: 1,    duration: 0.42, ease: "power3.out" }
    );
  }, [open]);

  /* close with exit animation */
  const handleClose = () => {
    if (!panelRef.current || !backdropRef.current) return;
    gsap.to(panelRef.current,   { y: 24, opacity: 0, scale: 0.96, duration: 0.22, ease: "power2.in" });
    gsap.to(backdropRef.current, {
      opacity: 0, duration: 0.22, ease: "power2.in",
      onComplete: () => { setOpen(false); setStatus("idle"); },
    });
  };

  /* escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);  // eslint-disable-line react-hooks/exhaustive-deps

  /* form submit → formsubmit.co */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/info@ujjwals.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) e.target.reset();
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">

      {/* backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative z-10 bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
      >
        {/* header bar */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--primary)]/8 sticky top-0 bg-white z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--secondary)] border-l-[3px] border-[var(--secondary)] pl-2.5">
              Enquiry Form
            </span>
            <h3
              className="font-black text-[var(--primary)] mt-0.5 leading-tight"
              style={{ fontSize: "clamp(17px, 2.2vw, 22px)", letterSpacing: "-0.01em" }}
            >
              Send Us a Message
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center border border-[var(--primary)]/12 text-[var(--primary)]/40 hover:text-[var(--primary)] hover:border-[var(--primary)]/30 transition-all duration-200"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {/* body */}
        <div className="px-7 py-7">
          {status === "sent" ? (

            /* ── success state ── */
            <div className="flex flex-col items-center gap-4 py-14 text-center">
              <FiCheckCircle className="text-[var(--secondary)] text-5xl" />
              <p className="text-[var(--primary)] font-black text-xl">Message Sent!</p>
              <p className="text-[var(--accent)]/55 text-sm max-w-xs leading-relaxed">
                Thank you for your enquiry. Our team will get back to you shortly.
              </p>
              <button
                onClick={handleClose}
                className="mt-3 px-6 py-2.5 bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-wide hover:bg-[var(--secondary)] transition-all duration-300"
              >
                Close
              </button>
            </div>

          ) : (

            /* ── form ── */
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="_subject" value="New Enquiry — Ujjwal Poly Pack Website" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name *">
                  <input
                    type="text" name="name" required
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    type="tel" name="phone"
                    placeholder="+91 XXXXX XXXXX"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Email Address *">
                <input
                  type="email" name="email" required
                  placeholder="your@email.com"
                  className={inputCls}
                />
              </Field>

              <Field label="Company / Business Name">
                <input
                  type="text" name="company"
                  placeholder="Your company name"
                  className={inputCls}
                />
              </Field>

              <Field label="Message / Enquiry *">
                <textarea
                  name="message" required rows={4}
                  placeholder="Describe your product requirement, quantity or any specific details..."
                  className={`${inputCls} resize-none`}
                />
              </Field>

              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 text-xs">
                  <FiAlertCircle className="shrink-0" />
                  Something went wrong. Please email us directly at info@ujjwals.com
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full flex items-center justify-center gap-2 bg-[var(--primary)] text-white text-sm font-bold uppercase tracking-wide py-3.5 hover:bg-[var(--secondary)] transition-all duration-300 disabled:opacity-55 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : <><span>Send Enquiry</span><FiSend /></>}
              </button>

              {/* quick contact strip */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 border-t border-[var(--primary)]/8">
                <a
                  href="tel:+919845012345"
                  className="flex items-center gap-1.5 text-xs text-[var(--accent)]/40 hover:text-[var(--secondary)] transition-colors duration-200"
                >
                  <FiPhone className="text-sm" /> +91 98450 12345
                </a>
                <span className="hidden sm:block w-px h-3 bg-[var(--primary)]/15" />
                <a
                  href="mailto:info@ujjwals.com"
                  className="flex items-center gap-1.5 text-xs text-[var(--accent)]/40 hover:text-[var(--secondary)] transition-colors duration-200"
                >
                  <FiMail className="text-sm" /> info@ujjwals.com
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
