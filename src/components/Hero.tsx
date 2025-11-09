// src/components/Hero.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import ParticlesComponent from "./ParticlesComponent";
import { FaGithub, FaInstagram, FaMapMarkerAlt, FaFacebook } from "react-icons/fa";

// Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};
const itemVariantsLeft: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};
// ใช้ ease เป็น cubic-bezier array เพื่อให้ TypeScript ผ่านแน่ ๆ
const itemVariantsRight: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center py-20 md:py-0">
      <ParticlesComponent />

      <motion.div
        className="container mx-auto px-8 md:px-14 lg:px-24 w-full flex flex-col md:flex-row items-center justify-between z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left text */}
        <div className="text-center md:text-left max-w-2xl">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100"
            variants={itemVariantsLeft}
          >
            Hello, I'm Pattle
          </motion.h1>

          <motion.div
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-300 mt-4"
            variants={itemVariantsLeft}
          >
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                2000,
                "Web Designer",
                2000,
                "UX/UI Designer",
                2000,
                "Backend Developer",
                2000,
                "I'AM STUDENT",
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-sky-400"
              repeat={Infinity}
            />
          </motion.div>

          <motion.p className="mt-6 text-slate-400 md:text-lg" variants={itemVariantsLeft}>
            Hey there! I'm currently studying Computer Technology at Phrae Technical College.
            Even though I'm still just a student, I've already got over a year of hands-on
            experience in web development and basic system programming. I'm a great team player
            and find it easy to collaborate with everyone. Since I started my journey, I've built
            several projects that I'm excited to show you. Feel free to check them out!
          </motion.p>

          <motion.div className="mt-8 flex justify-center md:justify-start gap-4" variants={itemVariantsLeft}>
            <a
              href="#projects"
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition-transform duration-300 transform hover:scale-105"
            >
              View My Work
            </a>
          </motion.div>
        </div>

        {/* Right profile card */}
        <motion.div className="mt-12 md:mt-0 w-full flex justify-center md:justify-end" variants={itemVariantsRight}>
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable
            glareMaxOpacity={0.15}
            glarePosition="all"
            scale={1.05}
          >
            <div
              className="relative w-80 lg:w-96 mx-auto h-auto min-h[400px]
                         bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg
                         border border-white/20 p-6 flex flex-col items-center
                         text-center text-slate-200"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-sky-400 mb-4 shadow-md">
                <img src="/itme.png" alt="Pattle Profile" className="w-full h-full object-cover" />
              </div>

              <h3 className="text-2xl font-bold text-slate-100">Patchararak Tisara</h3>
              <p className="text-md text-sky-400 font-medium">I am passionate about design and programming.</p>

              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mt-2">
                <FaMapMarkerAlt />
                <span>Phrae, Thailand</span>
              </div>

              <div className="flex-grow" />
              <div className="w-full">
                <div className="flex justify-center gap-5 mb-4">
                  <a
                    href="https://github.com/PCPzen"
                    className="text-slate-300 hover:text-sky-400 transition-colors"
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://www.facebook.com/phatchararak.minimy"
                    className="text-slate-300 hover:text-sky-400 transition-colors"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/pattle___/"
                    className="text-slate-300 hover:text-sky-400 transition-colors"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} />
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
