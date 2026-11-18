import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiCompass,
  FiLayers,
  FiMessageSquare,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";
import type { ProjectCategory, SectionId } from "../types";
import { projectsData } from "../data/projects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToSection: (section: SectionId) => void;
  onFilterProjects: (category: ProjectCategory) => void;
  onOpenProject: (projectId: number) => void;
  onOpenChat: () => void;
  onOpenBrief: () => void;
}

interface CommandItem {
  id: string;
  group: "Actions" | "Sections" | "Projects";
  label: string;
  hint: string;
  run: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onScrollToSection,
  onFilterProjects,
  onOpenProject,
  onOpenChat,
  onOpenBrief,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const commands = useMemo<CommandItem[]>(() => {
    const base: CommandItem[] = [
      {
        id: "act-brief",
        group: "Actions",
        label: "เปิด Candidate Quick Brief (สรุปโปรไฟล์สำหรับ HR)",
        hint: "Popup",
        run: () => {
          onClose();
          onOpenBrief();
        },
      },
      {
        id: "act-chat",
        group: "Actions",
        label: "คุยกับ Pattle AI Agent",
        hint: "AI Chat",
        run: () => {
          onClose();
          onOpenChat();
        },
      },
      {
        id: "act-filter-ai",
        group: "Actions",
        label: "กรองผลงานหมวด AI & Chatbot",
        hint: "Filter",
        run: () => {
          onClose();
          onFilterProjects("AI & Chatbot");
          onScrollToSection("projects");
        },
      },
      {
        id: "sec-home",
        group: "Sections",
        label: "ไปยังหน้าแรก (Hero)",
        hint: "#home",
        run: () => {
          onClose();
          onScrollToSection("home");
        },
      },
      {
        id: "sec-about",
        group: "Sections",
        label: "ไปยังประวัติและจุดเด่น (About)",
        hint: "#about",
        run: () => {
          onClose();
          onScrollToSection("about");
        },
      },
      {
        id: "sec-skills",
        group: "Sections",
        label: "ไปยังทักษะ Tech Stack (Skills)",
        hint: "#skills",
        run: () => {
          onClose();
          onScrollToSection("skills");
        },
      },
      {
        id: "sec-projects",
        group: "Sections",
        label: "ไปยังผลงานทั้งหมด (Projects)",
        hint: "#projects",
        run: () => {
          onClose();
          onScrollToSection("projects");
        },
      },
    ];

    const projectItems: CommandItem[] = projectsData.map((p) => ({
      id: `proj-${p.id}`,
      group: "Projects",
      label: p.title,
      hint: p.category,
      run: () => {
        onClose();
        onOpenProject(p.id);
      },
    }));

    return [...base, ...projectItems];
  }, [onClose, onFilterProjects, onOpenBrief, onOpenChat, onOpenProject, onScrollToSection]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const renderIcon = (group: CommandItem["group"], id: string) => {
    if (id === "act-brief") return <FiFileText className="text-emerald-400" size={16} />;
    if (id === "act-chat") return <FiMessageSquare className="text-[#00AEEF]" size={16} />;
    if (group === "Sections") return <FiCompass className="text-[#38BDF8]" size={16} />;
    return <FiLayers className="text-indigo-400" size={16} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 backdrop-blur-md px-4 pt-20 sm:pt-28"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-[#00AEEF]/35 bg-[#0A192F]/95 shadow-2xl shadow-[#00AEEF]/15"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <FiSearch className="text-[#38BDF8] shrink-0" size={18} />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหา Section, โปรเจกต์, หรือเปิด AI Chat..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Command Palette"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Command Results */}
            <div className="max-h-[380px] overflow-y-auto p-2.5 space-y-1">
              {filtered.length === 0 ? (
                <p className="py-8 text-center text-xs text-slate-400">
                  ไม่พบคำสั่งที่ตรงกับ &quot;{query}&quot;
                </p>
              ) : (
                filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={item.run}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left hover:bg-[#00AEEF]/15 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                        {renderIcon(item.group, item.id)}
                      </span>
                      <span className="truncate text-sm text-slate-200 group-hover:text-white">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[10px] rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-slate-400">
                        {item.hint}
                      </span>
                      <FiArrowRight
                        size={14}
                        className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-[#060D1A]/70 px-4 py-2 text-[11px] font-mono text-slate-400">
              <span>Quick Jump &amp; Agentic Shortcuts</span>
              <span>ESC เพื่อปิด</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
