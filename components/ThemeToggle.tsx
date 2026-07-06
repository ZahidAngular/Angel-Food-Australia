"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle({ light = false }: { light?: boolean }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full transition-colors ${
        light
          ? "bg-paper/15 text-paper hover:bg-paper/25"
          : "bg-fg/5 text-fg hover:bg-fg/10"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {ready && (
          <motion.span
            key={dark ? "moon" : "sun"}
            initial={{ y: 14, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
          >
            {dark ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4.2" fill="currentColor" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={i}
                    x1="12"
                    y1="1.5"
                    x2="12"
                    y2="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${i * 45} 12 12)`}
                  />
                ))}
              </svg>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
