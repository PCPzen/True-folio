import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.3;

    const update = () => {
      el.style.setProperty("--mx", `${targetX}px`);
      el.style.setProperty("--my", `${targetY}px`);
      rafId = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Top Reading Progress Indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#00AEEF] via-[#38BDF8] to-emerald-400 shadow-[0_0_10px_rgba(0,174,239,0.6)]"
      />

      {/* Calm, GPU-accelerated Ambient Canvas */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Base subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-70" />

        {/* Interactive Cursor Spotlight on Grid */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx, 50%) var(--my, 30%), rgba(0, 174, 239, 0.11), transparent 65%)",
          }}
        />

        {/* Slow Drifting Aurora Orbs (Eye-friendly, low-opacity) */}
        <div className="aurora-orb-1 absolute -top-32 -left-24 h-[460px] w-[460px] rounded-full bg-[#00AEEF]/[0.08] blur-[110px]" />
        <div className="aurora-orb-2 absolute top-[38%] -right-28 h-[520px] w-[520px] rounded-full bg-[#38BDF8]/[0.06] blur-[130px]" />
        <div className="aurora-orb-3 absolute -bottom-36 left-[25%] h-[440px] w-[440px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />

        {/* Soft Vignette for Contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(6, 13, 26, 0.72) 100%)",
          }}
        />
      </div>
    </>
  );
}
