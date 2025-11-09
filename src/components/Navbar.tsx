// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import ScrambledText from "./ScrambledText";

const navLinks = [
  { name: "HOME", path: "#home" },
  { name: "ABOUT", path: "#about" },
  { name: "SKILLS", path: "#skills" },
  { name: "PROJECTS", path: "#projects" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // อ่าน active จาก hash (ไม่ผูกกับ react-router)
  const [currentHash, setCurrentHash] = useState("#home");
  useEffect(() => {
    const sync = () => setCurrentHash(window.location.hash || "#home");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Toggle ChatBot -> broadcast ให้ ThreeDBot
  const [botEnabled, setBotEnabled] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent<boolean>("chatbot-toggle", { detail: botEnabled }));
    }
  }, [botEnabled]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a192f]/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-8 md:px-14 lg:px-24 flex justify-between items-center h-20">
        <a
          href="#home"
          className="text-2xl font-bold font-orbitron text-slate-100 hover:text-sky-400 transition-colors hover:drop-shadow-[0_0_5px_rgba(0,194,255,0.7)]"
        >
          <ScrambledText text="TisaraFolio" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = currentHash === link.path;
              return (
                <motion.li
                  key={link.name}
                  className="relative cursor-pointer py-2 px-3"
                  onHoverStart={() => setHoveredPath(link.path)}
                  onHoverEnd={() => setHoveredPath(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  <a
                    href={link.path}
                    className={`relative z-10 text-slate-300 transition-colors ${
                      isActive ? "text-sky-400 font-bold" : "hover:text-sky-400"
                    }`}
                  >
                    {link.name}
                  </a>
                  {(isActive || hoveredPath === link.path) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.li>
              );
            })}
          </ul>

          {/* iPhone-like toggle + ชื่อหมวดหมู่ ChatBot (Desktop) */}
          <div className="ml-2 flex items-center gap-2 select-none">
            <span className="text-slate-300 text-sm tracking-wide">ChatBot</span>
            <button
              type="button"
              role="switch"
              aria-checked={botEnabled}
              aria-label="Toggle ChatBot"
              title="Toggle ChatBot"
              onClick={() => setBotEnabled((v) => !v)}
              className={`h-7 w-12 rounded-full transition-colors duration-200 border border-white/10 
                ${botEnabled ? "bg-sky-500/80" : "bg-slate-600/60"}`}
            >
              <span
                className={`block h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-200 
                  ${botEnabled ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile toggler */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-200">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
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
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center space-y-10"
          >
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={link.path}
                    onClick={handleLinkClick}
                    className="text-3xl font-bold text-slate-300 hover:text-sky-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Toggle (Mobile) + ป้าย ChatBot */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-slate-300">ChatBot</span>
              <button
                type="button"
                role="switch"
                aria-checked={botEnabled}
                aria-label="Toggle ChatBot"
                title="Toggle ChatBot"
                onClick={() => setBotEnabled((v) => !v)}
                className={`h-8 w-14 rounded-full transition-colors duration-200 border border-white/10 
                  ${botEnabled ? "bg-sky-500/80" : "bg-slate-600/60"}`}
              >
                <span
                  className={`block h-7 w-7 bg-white rounded-full shadow transform transition-transform duration-200 
                    ${botEnabled ? "translate-x-7" : "translate-x-0.5"}`}
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
