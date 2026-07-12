"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealWords } from "./Reveal";
import { Logo } from "./Logo";
import { useContactModal } from "./ContactModalProvider";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Dairy-Free Cheese", href: "#cheese" },
      { label: "Plant-Based Meats", href: "#meats" },
      { label: "Why Angel Food", href: "#why" },
    ],
  },
  {
    title: "For Business",
    links: [
      { label: "Retailers", href: "#trade" },
      { label: "Foodservice", href: "#trade" },
      { label: "Work With Us", href: "__modal__" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@angelfood.com.au", href: "mailto:hello@angelfood.com.au" },
      { label: "Made in Australia", href: "#top" },
    ],
  },
];

export function Footer() {
  const { openModal } = useContactModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <footer id="contact" className="themed bg-bg px-4 pt-24 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl [perspective:1400px]">
        {/* CTA card with scroll reveal */}
        <motion.div
          ref={cardRef}
          style={{ scale, rotate, y, opacity, transformOrigin: "center bottom" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-terracotta px-6 py-16 text-paper will-change-transform sm:px-16 sm:py-24"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-paper/15" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-paper/5 blur-2xl" />

          <Reveal>
            <p className="mb-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-paper/80">
              <span className="h-1.5 w-1.5 rounded-full bg-paper" />
              Let&apos;s Work Together
            </p>
          </Reveal>
          <h2 className="display relative max-w-4xl text-4xl leading-[1.03] sm:text-6xl lg:text-7xl">
            <RevealWords text="Building the next generation of premium plant-based food." />
          </h2>
          <p className="mt-8 max-w-xl text-lg text-paper/85">
            Whether you&apos;re a supermarket, distributor, wholesaler, café or
            restaurant — we&apos;d love to hear from you. Join us.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={openModal}
              className="group inline-flex items-center gap-2 rounded-full bg-paper px-7 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              Send a Message
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            <a
              href="#top"
              className="rounded-full border border-paper/40 px-7 py-4 text-sm font-semibold text-paper transition-colors hover:border-paper"
            >
              Back to top ↑
            </a>
            <a
              href="mailto:hello@angelfood.com.au"
              className="text-sm font-medium text-paper/75 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
            >
              hello@angelfood.com.au
            </a>
          </div>
        </motion.div>

        {/* footer body */}
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="auto" className="h-20" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Premium dairy-free cheeses and plant-based meats — crafted for
              taste, texture and performance across Australia.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted/70">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5 text-sm text-fg">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href === "__modal__" ? (
                      <button
                        onClick={openModal}
                        className="transition-colors hover:text-terracotta"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        className="transition-colors hover:text-terracotta"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-8 text-xs text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Angel Food Australia. Plant-based food,
            made for everyone.
          </span>
          <span className="uppercase tracking-[0.2em]">Made in Australia 🇦🇺</span>
        </div>
      </div>
    </footer>
  );
}

export function FooterBar() {
  return null;
}
