"use client";
import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useContactModal } from "./ContactModalProvider";

const links = [
  { label: "Cheese", href: "#cheese" },
  { label: "Meats", href: "#meats" },
  { label: "Why Us", href: "#why" },
  { label: "Trade", href: "#trade" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { openModal } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled; // text is light while floating over the hero

  return (
    <>
      <motion.header
        initial={{ y: -110 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-0 top-0 z-50 w-[100vw]"
      >
        {/* scroll progress hairline */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute left-0 top-0 z-10 h-[3px] w-full origin-left bg-terracotta"
        />

        <div className="px-3 pt-3 sm:px-6 sm:pt-4">
          <nav
            className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl pl-4 pr-3 py-2.5 transition-all duration-500 sm:pl-6 ${
              scrolled
                ? "themed border border-line bg-surface/85 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                : "border border-transparent bg-transparent"
            }`}
          >
            {/* left: logo + live status */}
            <div className="flex items-center gap-4">
              <a href="#top">
                <Logo tone={light ? "light" : "auto"} className="h-14 sm:h-16" />
              </a>
              <span
                className={`hidden items-center gap-2 border-l pl-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] lg:flex ${
                  light
                    ? "border-paper/25 text-paper/70"
                    : "border-line text-muted"
                }`}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terracotta opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
                </span>
                Open for Wholesale
              </span>
            </div>

            {/* center: nav with sliding highlight */}
            <ul
              className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {links.map((l) => (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    onMouseEnter={() => setHovered(l.href)}
                    className={`relative block px-4 py-2 text-sm font-medium transition-colors ${
                      light ? "text-paper/85" : "text-muted"
                    }`}
                  >
                    {hovered === l.href && (
                      <motion.span
                        layoutId="nav-highlight"
                        className={`absolute inset-0 rounded-full ${
                          light ? "bg-paper/15" : "bg-fg/10"
                        }`}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative z-10">{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* right: theme toggle + CTA + mobile toggle */}
            <div className="flex items-center gap-2">
              <ThemeToggle light={light} />
              <button
                onClick={openModal}
                className={`group hidden items-center gap-2 rounded-full py-2 pl-5 pr-2 text-sm font-semibold transition-colors sm:flex ${
                  scrolled
                    ? "bg-fg text-bg hover:bg-terracotta hover:text-paper"
                    : "bg-paper text-ink hover:bg-cheese"
                }`}
              >
                Work With Us
                <span className="grid h-7 w-7 place-items-center rounded-full bg-terracotta text-paper transition-transform duration-300 group-hover:rotate-45">
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
              </button>

              {/* mobile menu button */}
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className={`grid h-10 w-10 place-items-center rounded-full transition-colors md:hidden ${
                  light ? "bg-paper/15 text-paper" : "bg-fg/10 text-fg"
                }`}
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="h-[2px] w-5 bg-current" />
                  <span className="h-[2px] w-5 bg-current" />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-0 top-0 z-[60] flex w-[100vw] h-[100vh] flex-col bg-olive px-6 py-6 text-paper md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo tone="light" className="h-14" />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-paper/10 text-2xl leading-none text-paper"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-center justify-between border-b border-paper/15 py-4 text-4xl text-paper transition-colors hover:text-cheese"
                  >
                    {l.label}
                    <span className="text-lg text-cheese">↗</span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + links.length * 0.07,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="display flex w-full items-center justify-between border-b border-paper/15 py-4 text-4xl text-paper transition-colors hover:text-cheese"
                >
                  Work With Us
                  <span className="text-lg text-cheese">↗</span>
                </button>
              </motion.li>
            </ul>

            <div className="pt-6 text-sm text-paper/60">
              hello@angelfood.com.au · Made in Australia
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
