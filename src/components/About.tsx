import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { profileData } from "../data/profile";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#38BDF8]">
          01 / ABOUT ME
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100">
          System Analysis Meets <span className="text-[#00AEEF]">AI Agent Design</span>
        </h2>
      </div>

      <motion.div
        className="rounded-3xl border border-white/10 bg-[#0A192F]/70 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Portrait + Milestones */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative max-w-xs mx-auto lg:mx-0">
              <div className="relative rounded-2xl overflow-hidden border border-[#00AEEF]/35 bg-[#060D1A] p-2">
                <img
                  src="/itmy1.png"
                  alt={profileData.fullName}
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
              <div className="absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2 border-[#00AEEF] rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-[#00AEEF] rounded-br-lg" />
            </div>

            <div className="space-y-3">
              {profileData.milestones.map((m) => (
                <div
                  key={m.step}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#060D1A]/70 p-3.5"
                >
                  <span className="font-mono text-xs font-bold text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/30 rounded-lg px-2 py-1">
                    {m.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100">{m.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{m.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quote + Narrative + Highlights */}
          <div className="lg:col-span-7 text-left">
            <blockquote className="border-l-2 border-[#00AEEF] pl-4 text-lg sm:text-xl font-semibold text-[#38BDF8] mb-6">
              &ldquo;{profileData.aboutQuote}&rdquo;
            </blockquote>

            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              {profileData.aboutParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-4">
              Core Capabilities
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-200">
              {profileData.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#060D1A]/60 px-3.5 py-2.5"
                >
                  <FiCheckCircle className="text-[#00AEEF] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
