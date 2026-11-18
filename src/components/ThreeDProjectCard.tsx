import { motion } from "framer-motion";
import { FiGitBranch, FiExternalLink } from "react-icons/fi";
import type { ProjectData } from "../types";

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
}

const CATEGORY_STYLES: Record<ProjectData["category"], string> = {
  "AI & Chatbot": "border-[#00AEEF]/50 bg-[#00AEEF]/15 text-[#38BDF8]",
  Automation: "border-emerald-400/40 bg-emerald-500/15 text-emerald-300",
  "Web System": "border-indigo-400/40 bg-indigo-500/15 text-indigo-300",
};

export default function ThreeDProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A192F]/85 backdrop-blur-xl shadow-xl hover:border-[#00AEEF]/50 hover:shadow-[#00AEEF]/15 transition-all cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-[#060D1A]">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold backdrop-blur-md ${
              CATEGORY_STYLES[project.category]
            }`}
          >
            {project.category}
          </span>

          {project.featured && (
            <span className="rounded-full border border-amber-400/40 bg-amber-500/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300 backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-100 group-hover:text-[#38BDF8] transition-colors line-clamp-2">
          {project.title}
        </h3>

        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">
          {project.preview}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-[#060D1A]/80 px-2 py-0.5 font-mono text-[11px] text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs font-semibold text-[#38BDF8]">
          <span className="inline-flex items-center gap-1.5">
            <FiGitBranch size={14} />
            <span>View Architecture Flow</span>
          </span>
          {project.link && <FiExternalLink size={14} className="text-slate-400 group-hover:text-[#38BDF8]" />}
        </div>
      </div>
    </motion.article>
  );
}
