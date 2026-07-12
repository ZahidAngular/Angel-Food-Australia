"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { submitLead } from "@/lib/formService";

const inquiryTypes = ["Retailer", "Foodservice / Café", "Distributor", "General Enquiry"];

const inputCls =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-muted/60 outline-none transition-colors focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [inquiry, setInquiry] = useState(inquiryTypes[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !emailValid || !message.trim()) {
      setError("Please fill in your name, a valid email and a message.");
      setSent(false);
      return;
    }
    setError("");
    setSubmitting(true);

    const comment = [
      `Enquiry type: ${inquiry}`,
      company ? `Company: ${company}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await submitLead({
        fullName: name,
        email,
        phone,
        comment,
      });
      setSent(true);
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setInquiry(inquiryTypes[0]);
    } catch {
      setError("Something went wrong sending your message. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 [perspective:1800px] sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.88, rotateX: 22 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 40, scale: 0.9, rotateX: 14 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center bottom" }}
            className="themed relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[2rem] border border-line shadow-[0_70px_160px_-40px_rgba(0,0,0,0.6)] sm:rounded-[2.5rem]"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-ink/10 text-fg backdrop-blur-md transition-colors hover:bg-ink/20 sm:right-6 sm:top-6"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* left: info panel */}
              <div className="relative flex flex-col justify-between overflow-hidden bg-olive p-8 text-paper sm:p-12">
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cheese/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-terracotta/15 blur-3xl" />

                <div className="relative">
                  <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cheese">
                    <span className="h-1.5 w-1.5 rounded-full bg-cheese" />
                    Get In Touch
                  </p>
                  <h2 className="display text-3xl leading-[1.05] sm:text-4xl">
                    Let&apos;s talk business.
                  </h2>
                  <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
                    Tell us a bit about your business and what you&apos;re
                    looking for — a real human replies within one business
                    day.
                  </p>

                  <div className="mt-10 flex flex-col gap-5">
                    <InfoRow
                      icon={
                        <path
                          d="M3 6.5 12 13l9-6.5M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      }
                      label="Email us"
                      value="hello@angelfood.com.au"
                    />
                    <InfoRow
                      icon={
                        <>
                          <path
                            d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="9.5"
                            r="2.2"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </>
                      }
                      label="Based in"
                      value="Australia, made for Australia"
                    />
                    <InfoRow
                      icon={
                        <path
                          d="M12 7v5l3.2 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      }
                      label="Response time"
                      value="Within 1 business day"
                    />
                  </div>
                </div>

                <div className="relative mt-12 flex items-center justify-between border-t border-paper/15 pt-6">
                  <Logo tone="light" className="h-8 opacity-90" />
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-paper/50">
                    Trade &amp; Retail
                  </span>
                </div>
              </div>

              {/* right: form panel */}
              <div className="bg-surface p-8 sm:p-12">
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Jane Smith"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="jane@company.com.au"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        placeholder="04XX XXX XXX"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Company (optional)">
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        type="text"
                        placeholder="Your business name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Enquiry type" className="sm:col-span-2">
                      <div className="relative">
                        <select
                          value={inquiry}
                          onChange={(e) => setInquiry(e.target.value)}
                          className={`${inputCls} appearance-none pr-10`}
                        >
                          {inquiryTypes.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="m6 9 6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Message">
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Tell us what you're after..."
                        className={`${inputCls} resize-none`}
                      />
                    </Field>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-olive disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-paper/20 transition-transform group-hover:translate-x-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M7 17L17 7M17 7H9M17 7V15"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </>
                      )}
                    </button>

                    {error && (
                      <p className="text-sm font-medium text-terracotta">
                        {error}
                      </p>
                    )}
                    {sent && !error && (
                      <p className="flex items-center gap-1.5 text-sm font-medium text-olive-mid">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M20 6 9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Thanks! Your message has been sent — we&apos;ll be in touch soon.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper/10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          {icon}
        </svg>
      </span>
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.15em] text-paper/50">
          {label}
        </p>
        <p className="text-sm font-medium text-paper">{value}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
