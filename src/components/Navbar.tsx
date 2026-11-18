import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMessageSquare, FiSearch } from "react-icons/fi";
import ScrambledText from "./ScrambledText";
import type { SectionId } from "../types";

interface NavbarProps {
  activeSection: SectionId;
  onOpenChat: () => void;
  onOpenCommandPalette: () => void;
}

const navLinks: Array<{ name: string; id: SectionId; path: string }> = [
  { name: "HOME", id: "home", path: "#home" },
  { name: "ABOUT", id: "about", path: "#about" },
  { name: "SKILLS", id: "skills", path: "#skills" },
  { name: "PROJECTS", id: "projects", path: "#projects" },
];

const Navbar = ({ activeSection, onOpenChat, onOpenCommandPalette }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null);
  const [botEnabled, setBotEnabled] = useState(true);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent<boolean>("chatbot-toggle", { detail: botEnabled }));
  }, [botEnabled]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#060D1A]/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12 lg:px-20">
        <a
          href="#home"
          className="flex items-center gap-2.5 text-xl sm:text-2xl font-extrabold tracking-tight text-slate-100 hover:text-[#38BDF8] transition-colors"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#00AEEF] shadow-[0_0_10px_#00AEEF]" />
          <ScrambledText text="TisaraFolio" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <motion.li
                  key={link.id}
                  className="relative px-3 py-2"
                  onHoverStart={() => setHoveredId(link.id)}
                  onHoverEnd={() => setHoveredId(null)}
                >
                  <a
                    href={link.path}
                    className={`relative z-10 font-mono text-xs tracking-wider transition-colors ${
                      isActive ? "text-[#38BDF8] font-bold" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                  {(isActive || hoveredId === link.id) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#00AEEF]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* Command Palette Shortcut */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            title="Quick Jump (Ctrl+K)"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 hover:border-[#00AEEF]/40 hover:text-white transition-colors"
          >
            <FiSearch size={13} className="text-[#38BDF8]" />
            <span className="font-mono text-[11px] text-slate-400">Ctrl+K</span>
          </button>

          {/* Quick Chat CTA */}
          <button
            type="button"
            onClick={onOpenChat}
            className="inline-flex items-center gap-2 rounded-xl border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-3.5 py-2 text-xs font-semibold text-[#38BDF8] hover:bg-[#00AEEF]/20 transition-colors"
          >
            <FiMessageSquare size={14} />
            <span>Chat with AI</span>
          </button>

          {/* 3D Bot Toggle */}
          <div className="flex items-center gap-2 select-none border-l border-white/10 pl-4">
            <span className="font-mono text-xs text-slate-400">3D Bot</span>
            <button
              type="button"
              role="switch"
              aria-checked={botEnabled}
              aria-label="Toggle 3D AI Bot"
              onClick={() => setBotEnabled((v) => !v)}
              className={`h-6 w-11 rounded-full border border-white/10 p-0.5 transition-colors duration-200 ${
                botEnabled ? "bg-[#00AEEF]" : "bg-slate-700"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                  botEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Toggler */}
        <div className="lg:hidden z-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenChat}
            aria-label="Open AI Chat"
            className="rounded-lg border border-[#00AEEF]/40 bg-[#00AEEF]/10 p-2 text-[#38BDF8]"
          >
            <FiMessageSquare size={18} />
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle Menu"
            className="text-slate-200 p-1"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 top-20 z-40 flex flex-col items-center justify-center space-y-8 bg-[#060D1A]/95 backdrop-blur-xl"
          >
            <ul className="flex flex-col items-center space-y-6">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index }}
                >
                  <a
                    href={link.path}
                    onClick={handleLinkClick}
                    className={`text-2xl font-bold transition-colors ${
                      activeSection === link.id ? "text-[#38BDF8]" : "text-slate-200 hover:text-[#38BDF8]"
                    }`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <span className="font-mono text-sm text-slate-300">3D AI Bot</span>
              <button
                type="button"
                role="switch"
                aria-checked={botEnabled}
                aria-label="Toggle 3D AI Bot"
                onClick={() => setBotEnabled((v) => !v)}
                className={`h-7 w-12 rounded-full border border-white/10 p-0.5 transition-colors duration-200 ${
                  botEnabled ? "bg-[#00AEEF]" : "bg-slate-700"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
                    botEnabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
