import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiGitBranch,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";
import ThreeDProjectCard from "./ThreeDProjectCard";
import { projectsData } from "../data/projects";
import type { ArchitectureNode, ProjectCategory } from "../types";

interface ProjectsProps {
  activeFilter: ProjectCategory;
  onFilterChange: (category: ProjectCategory) => void;
  selectedProjectId: number | null;
  onSelectProjectId: (id: number | null) => void;
  onAskAiAboutProject: (projectTitle: string) => void;
}

const FILTER_TABS: ProjectCategory[] = ["All", "AI & Chatbot", "Automation", "Web System"];

const NODE_BADGE_COLORS: Record<ArchitectureNode["nodeType"], string> = {
  trigger: "border-[#00AEEF]/50 bg-[#00AEEF]/15 text-[#38BDF8]",
  ai: "border-purple-400/50 bg-purple-500/15 text-purple-300",
  logic: "border-amber-400/50 bg-amber-500/15 text-amber-300",
  data: "border-indigo-400/50 bg-indigo-500/15 text-indigo-300",
  output: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
};

export default function Projects({
  activeFilter,
  onFilterChange,
  selectedProjectId,
  onSelectProjectId,
  onAskAiAboutProject,
}: ProjectsProps) {
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const selectedProject = useMemo(
    () => projectsData.find((p) => p.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  // Close modal with Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProjectId !== null) {
        onSelectProjectId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProjectId, onSelectProjectId]);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
            03 / SELECTED WORK
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
            Projects &amp; <span className="text-[#00AEEF]">Architecture</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-400 text-sm sm:text-base">
            รวมผลงาน AI Agent, Automation Pipeline และ Web System ที่ใช้งานจริง คลิกที่การ์ดเพื่อดู Architecture Flow ภายในระบบ
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="inline-flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-[#0A192F]/80 p-1.5"
        >
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(tab)}
                className={`rounded-xl px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#00AEEF] text-[#060D1A] shadow-md shadow-[#00AEEF]/25"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ThreeDProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProjectId(project.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail & Architecture Flow Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => onSelectProjectId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[#00AEEF]/40 bg-[#0A192F] shadow-2xl shadow-[#00AEEF]/20"
            >
              {/* Modal Top Image Banner */}
              <div className="relative h-52 sm:h-64 w-full shrink-0 overflow-hidden bg-[#060D1A]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => onSelectProjectId(null)}
                  aria-label="Close modal"
                  className="absolute top-4 right-4 rounded-full border border-white/20 bg-[#060D1A]/80 p-2 text-slate-200 hover:border-[#00AEEF] hover:text-white transition-colors"
                >
                  <FiX size={20} />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block rounded-full border border-[#00AEEF]/50 bg-[#00AEEF]/20 px-3 py-0.5 font-mono text-xs font-semibold text-[#38BDF8] mb-2">
                    {selectedProject.category}
                  </span>
                  <h3
                    id="project-modal-title"
                    className="text-2xl sm:text-3xl font-extrabold text-white"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.fullDescription}
                </p>

                {/* Architecture Flow Preview */}
                <div className="rounded-2xl border border-[#00AEEF]/30 bg-[#060D1A]/80 p-5">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#38BDF8] mb-4">
                    <FiGitBranch size={14} />
                    <span>Architecture Flow Preview</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {selectedProject.architectureFlow.map((node, idx) => (
                      <div
                        key={node.step}
                        className="relative flex flex-col rounded-xl border border-white/10 bg-[#0A192F]/90 p-3.5"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-[11px] font-bold text-slate-400">
                            STEP {node.step}
                          </span>
                          <span
                            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase ${
                              NODE_BADGE_COLORS[node.nodeType]
                            }`}
                          >
                            {node.nodeType}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-100">{node.label}</h4>
                        <p className="mt-1 text-xs text-slate-400 leading-relaxed">{node.detail}</p>

                        {idx < selectedProject.architectureFlow.length - 1 && (
                          <FiArrowRight
                            className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-[#00AEEF]"
                            size={14}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                    Tech Stack &amp; Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-[#00AEEF]/30 bg-[#00AEEF]/10 px-3 py-1 font-mono text-xs text-[#38BDF8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/10">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-5 py-2.5 text-sm font-bold text-[#060D1A] hover:bg-[#38BDF8] transition-colors"
                    >
                      <span>{selectedProject.liveDemoLabel ?? "View Live Project"}</span>
                      <FiExternalLink size={15} />
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-[#00AEEF]/50 hover:text-white transition-colors"
                    >
                      <FiGithub size={15} />
                      <span>GitHub</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProject.title;
                      onSelectProjectId(null);
                      onAskAiAboutProject(title);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-5 py-2.5 text-sm font-semibold text-[#38BDF8] hover:bg-[#00AEEF]/20 transition-colors"
                  >
                    <FiMessageSquare size={15} />
                    <span>Ask AI about this project</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
