import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiCheckCircle,
  FiMessageSquare,
  FiExternalLink,
  FiCpu,
} from "react-icons/fi";
import { profileData } from "../data/profile";
import { projectsData } from "../data/projects";

interface QuickBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
  onOpenProject: (projectId: number) => void;
}

export default function QuickBriefModal({
  isOpen,
  onClose,
  onOpenChat,
  onOpenProject,
}: QuickBriefModalProps) {
  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#00AEEF]/35 bg-[#0A192F]/95 shadow-2xl shadow-[#00AEEF]/15"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-[#060D1A]/70 px-6 py-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00AEEF]/15 border border-[#00AEEF]/40 text-[#38BDF8]">
                  <FiCpu size={22} />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-400">
                    HR 1-Glance Candidate Brief
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                    {profileData.fullName} ({profileData.nickname})
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Quick Brief"
                className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-[#060D1A]/60 p-4">
                  <p className="font-mono text-[11px] text-[#38BDF8]">TARGET ROLE</p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    {profileData.roleTitle}
                  </p>
                  <p className="mt-1 text-xs text-emerald-400">{profileData.availabilityBadge}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#060D1A]/60 p-4">
                  <p className="font-mono text-[11px] text-[#38BDF8]">EDUCATION</p>
                  <p className="mt-1 text-sm font-semibold text-slate-100">
                    {profileData.education}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{profileData.location}</p>
                </div>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Highlights
                </p>
                <ul className="space-y-2">
                  {profileData.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[#00AEEF]" size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-2.5">
                  Featured Projects (คลิกเพื่อดู Architecture Flow)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {featured.map((proj) => (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenProject(proj.id);
                      }}
                      className="rounded-2xl border border-white/10 bg-[#060D1A]/75 p-3.5 text-left hover:border-[#00AEEF]/50 transition-colors"
                    >
                      <span className="font-mono text-[10px] text-[#38BDF8]">
                        {proj.category}
                      </span>
                      <p className="mt-1 text-xs font-bold text-slate-100 line-clamp-2">
                        {proj.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#060D1A]/70 px-6 py-4">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-[#38BDF8] transition-colors"
              >
                <FiExternalLink size={14} />
                <span>GitHub: PCPzen</span>
              </a>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenChat();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-4 py-2 text-xs font-bold text-[#060D1A] hover:bg-[#38BDF8] transition-colors"
                >
                  <FiMessageSquare size={14} />
                  <span>ถาม AI Agent</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
