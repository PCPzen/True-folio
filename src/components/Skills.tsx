import { motion } from "framer-motion";
import {
  FiCpu,
  FiMessageCircle,
  FiTerminal,
  FiLayers,
  FiZap,
  FiGlobe,
  FiShield,
} from "react-icons/fi";
import {
  SiPhp,
  SiGit,
  SiVite,
  SiFigma,
  SiThreedotjs,
  SiPython,
  SiNextdotjs,
  SiPrisma,
  SiSupabase,
  SiGithubactions,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { skillCategories } from "../data/skills";

const ICON_MAP: Record<string, IconType> = {
  bot: FiCpu,
  sparkles: FiZap,
  cpu: FiLayers,
  message: FiMessageCircle,
  shield: FiShield,
  python: SiPython,
  actions: SiGithubactions,
  webhook: FiGlobe,
  nextjs: SiNextdotjs,
  prisma: SiPrisma,
  supabase: SiSupabase,
  php: SiPhp,
  git: SiGit,
  vite: SiVite,
  figma: SiFigma,
  three: SiThreedotjs,
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
          02 / CAPABILITIES
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
          AI, Automation &amp; <span className="text-[#00AEEF]">Tech Stack</span>
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400 text-sm sm:text-base">
          จัดกลุ่มทักษะแบบ Bento Grid เพื่อสะท้อนการทำงานสาย AI Agent Builder ตั้งแต่การออกแบบ Flow ไปจนถึงการเชื่อมต่อ API และฐานข้อมูล
        </p>
      </div>

      {/* 4-Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {skillCategories.map((category, catIdx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: catIdx * 0.08 }}
            viewport={{ once: true, amount: 0.15 }}
            className={`${category.spanClass} rounded-3xl border border-white/10 bg-[#0A192F]/75 backdrop-blur-xl p-6 sm:p-7 hover:border-[#00AEEF]/40 transition-colors`}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-xl font-bold text-slate-100">{category.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{category.subtitle}</p>
              </div>
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0 mt-2"
                style={{
                  backgroundColor: category.accent,
                  boxShadow: `0 0 12px ${category.accent}`,
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {category.skills.map((skill) => {
                const Icon = ICON_MAP[skill.iconKey] ?? FiTerminal;
                return (
                  <div
                    key={skill.name}
                    className="group rounded-2xl border border-white/10 bg-[#060D1A]/75 p-4 hover:border-[#00AEEF]/45 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-transform group-hover:scale-105"
                          style={{ color: skill.color }}
                        >
                          <Icon size={18} />
                        </div>
                        <span className="font-semibold text-sm text-slate-100">
                          {skill.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
