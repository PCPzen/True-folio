import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import {
  FaGithub,
  FaInstagram,
  FaMapMarkerAlt,
  FaFacebook,
} from "react-icons/fa";
import { FiArrowRight, FiMessageSquare, FiFileText } from "react-icons/fi";
import { profileData } from "../data/profile";

interface HeroProps {
  onOpenChat: () => void;
  onOpenBrief: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const itemVariantsLeft: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const itemVariantsRight: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = ({ onOpenChat, onOpenBrief }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 md:py-24 overflow-hidden"
    >
      {/* Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[420px] w-[720px] rounded-full bg-[#00AEEF]/12 blur-[120px]"
      />

      <motion.div
        className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Narrative */}
        <div className="text-center lg:text-left max-w-2xl">
          {/* Live Status Badge */}
          <motion.div variants={itemVariantsLeft} className="inline-flex mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-4 py-1.5 font-mono text-xs font-medium text-[#38BDF8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {profileData.availabilityBadge}
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-[1.12]"
            variants={itemVariantsLeft}
          >
            Hi, I&apos;m <span className="text-[#00AEEF]">{profileData.nickname}</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300 mt-3">
              <TypeAnimation
                sequence={[
                  "AI Agent Builder",
                  2200,
                  "Chatbot Flow Designer",
                  2200,
                  "Workflow Automation",
                  2200,
                  "System & Web Developer",
                  2200,
                ]}
                wrapper="span"
                speed={52}
                className="text-[#38BDF8]"
                repeat={Infinity}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-slate-300/90 text-base sm:text-lg leading-relaxed"
            variants={itemVariantsLeft}
          >
            {profileData.heroBio}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
            variants={itemVariantsLeft}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00AEEF] px-6 py-3.5 text-sm sm:text-base font-bold text-[#060D1A] shadow-lg shadow-[#00AEEF]/25 hover:bg-[#38BDF8] transition-all hover:-translate-y-0.5"
            >
              <span>ดูผลงาน / View Projects</span>
              <FiArrowRight />
            </a>

            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 rounded-xl border border-[#00AEEF]/50 bg-[#0A192F]/80 px-6 py-3.5 text-sm sm:text-base font-semibold text-[#38BDF8] hover:bg-[#00AEEF]/15 transition-all hover:-translate-y-0.5"
            >
              <FiMessageSquare />
              <span>คุยกับ AI Bot ของผม</span>
            </button>

            <button
              type="button"
              onClick={onOpenBrief}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-medium text-slate-200 hover:border-[#00AEEF]/45 hover:text-white transition-all hover:-translate-y-0.5"
            >
              <FiFileText className="text-emerald-400" />
              <span>Quick Brief</span>
            </button>
          </motion.div>
        </div>

        {/* Right Profile Card (with min-h-[400px] fix) */}
        <motion.div
          className="w-full max-w-sm flex justify-center lg:justify-end"
          variants={itemVariantsRight}
        >
          <Tilt
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.12}
            glarePosition="all"
            scale={1.02}
          >
            <div className="relative w-80 sm:w-96 min-h-[400px] rounded-2xl border border-[#00AEEF]/25 bg-[#0A192F]/80 backdrop-blur-xl p-6 shadow-2xl shadow-[#00AEEF]/10 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-[#00AEEF] p-1 bg-[#060D1A] mb-5 shadow-lg shadow-[#00AEEF]/20">
                <img
                  src="/itme.png"
                  alt={profileData.fullName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              <span className="font-mono text-[11px] uppercase tracking-widest text-[#38BDF8] mb-1">
                AI Agent Builder Intern
              </span>
              <h2 className="text-2xl font-bold text-slate-100">
                {profileData.fullName}
              </h2>
              <p className="text-sm text-slate-300 mt-1">
                {profileData.education}
              </p>

              <div className="flex items-center justify-center gap-2 font-mono text-slate-400 text-xs mt-3">
                <FaMapMarkerAlt className="text-[#00AEEF]" />
                <span>
                  {profileData.location} · {profileData.coordinates}
                </span>
              </div>

              <div className="flex-grow" />

              <div className="w-full pt-4 border-t border-white/10 mt-5">
                <div className="flex justify-center gap-6">
                  <a
                    href={profileData.socials.github}
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={22} />
                  </a>
                  <a
                    href={profileData.socials.facebook}
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={22} />
                  </a>
                  <a
                    href={profileData.socials.instagram}
                    className="text-slate-300 hover:text-[#38BDF8] transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={22} />
                  </a>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
