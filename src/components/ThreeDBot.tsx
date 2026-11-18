import { lazy, Suspense, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX } from "react-icons/fi";
import type { BotState, SectionId } from "../types";
import { SECTION_GREETINGS } from "../data/botKnowledge";

const LazyBotCanvas = lazy(() => import("./BotCanvas"));

interface ThreeDBotProps {
  currentSection: SectionId;
  botState: BotState;
  isChatOpen: boolean;
  onToggleChat: () => void;
}

const STATE_LABELS: Record<BotState, { text: string; dotClass: string }> = {
  idle: { text: "AI Core Online", dotClass: "bg-[#00AEEF]" },
  thinking: { text: "Routing Intent...", dotClass: "bg-amber-400 animate-pulse" },
  speaking: { text: "Responding", dotClass: "bg-emerald-400 animate-pulse" },
};

export default function ThreeDBot({
  currentSection,
  botState,
  isChatOpen,
  onToggleChat,
}: ThreeDBotProps) {
  const [enabled, setEnabled] = useState(true);
  const [showBubble, setShowBubble] = useState(true);
  const [mountedCanvas, setMountedCanvas] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Defer 3D Canvas mount until after first paint so Hero LCP is unblocked
  useEffect(() => {
    const timer = window.setTimeout(() => setMountedCanvas(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  // Listen to Navbar toggle event
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setEnabled(Boolean(ce.detail));
    };
    window.addEventListener("chatbot-toggle", handler as EventListener);
    return () => window.removeEventListener("chatbot-toggle", handler as EventListener);
  }, []);

  // Show contextual greeting briefly when section changes (if chat drawer is closed)
  useEffect(() => {
    if (!enabled || isChatOpen) return;
    setShowBubble(true);
    const timer = window.setTimeout(() => setShowBubble(false), 5500);
    return () => window.clearTimeout(timer);
  }, [currentSection, enabled, isChatOpen]);

  if (!enabled) return null;

  const status = STATE_LABELS[botState];

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Contextual Speech Bubble */}
      <AnimatePresence>
        {showBubble && !isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto relative max-w-[280px] sm:max-w-xs rounded-2xl border border-[#00AEEF]/40 bg-[#0A192F]/90 p-3.5 pr-8 text-xs sm:text-sm leading-relaxed text-slate-100 shadow-2xl shadow-[#00AEEF]/15 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setShowBubble(false)}
              aria-label="Dismiss bot message"
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white transition-colors"
            >
              <FiX size={14} />
            </button>
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#38BDF8] mb-1">
              Pattle AI Guide · #{currentSection}
            </p>
            <p>{SECTION_GREETINGS[currentSection]}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D AI Core Floating Trigger */}
      <motion.button
        type="button"
        onClick={onToggleChat}
        aria-label={isChatOpen ? "Close AI Agent Chat" : "Open AI Agent Chat"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="pointer-events-auto group relative flex items-center gap-3 rounded-full border border-[#00AEEF]/45 bg-[#0A192F]/90 p-2 pr-4 shadow-2xl shadow-[#00AEEF]/25 backdrop-blur-xl transition-colors hover:border-[#38BDF8]"
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-full bg-[#060D1A] border border-[#00AEEF]/30 flex items-center justify-center">
          {mountedCanvas ? (
            <Suspense
              fallback={
                <div className="h-8 w-8 rounded-full bg-[#00AEEF]/30 border border-[#38BDF8] animate-pulse" />
              }
            >
              <LazyBotCanvas botState={botState} reducedMotion={reducedMotion} />
            </Suspense>
          ) : (
            <div className="h-8 w-8 rounded-full bg-[#00AEEF]/30 border border-[#38BDF8] animate-pulse" />
          )}
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${status.dotClass}`} />
            <span className="font-mono text-[11px] font-semibold text-[#38BDF8]">
              {status.text}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-100 group-hover:text-white mt-0.5">
            <FiMessageSquare size={13} className="text-[#00AEEF]" />
            <span>{isChatOpen ? "Close Chat" : "Ask Pattle AI"}</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
