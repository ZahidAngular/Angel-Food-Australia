"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Wraps a normal section with a scroll reveal.
 * - variant="wheel": the section spins in like a water-wheel (in-plane rotateZ),
 *   sits flat/normal while centered, then spins out as it leaves. A slight
 *   overscan-scale keeps the rotation from opening big gaps at the edges.
 * - variant="soft": a restrained fade + rise (no rotation).
 *
 * On narrow (mobile) viewports the rotation is toned down to a light touch —
 * a tall section rotated by a desktop-sized angle swings far enough sideways
 * that its edges (and text) go off-screen on a ~375px-wide viewport. Desktop
 * and tablet keep the original angle untouched.
 */
export function WheelSection({
  children,
  className = "",
  variant = "wheel",
  angle = 19,
}: {
  children: ReactNode;
  className?: string;
  variant?: "wheel" | "soft";
  angle?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const wheel = variant === "wheel";
  const effectiveAngle = isMobile ? 1.5 : angle;
  const riseDistance = isMobile ? 18 : 80;
  const overscan = isMobile ? 1.004 : 1.08;

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    wheel
      ? [effectiveAngle, 0, 0, -effectiveAngle]
      : [0, 0, 0, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    wheel
      ? [riseDistance, 0, 0, -riseDistance]
      : [56, 0, 0, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    wheel ? [overscan, 1, 1, overscan] : [1, 1, 1, 1]
  );
  const opacity = useTransform(
    scrollYProgress,
    wheel ? [0, 0.18, 0.82, 1] : [0, 0.22, 1, 1],
    wheel ? [0, 1, 1, 0] : [0, 1, 1, 1]
  );

  return (
    <div ref={ref}>
      <motion.div
        style={{ rotate, y, scale, opacity, transformOrigin: "center center" }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
