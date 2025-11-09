// src/components/About.tsx

import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

const technologies = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Framer Motion",
  "Git & GitHub",
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="text-center mb-16">
        <motion.h2
          className="text-6xl lg:text-7xl font-extrabold text-slate-100 mb-4
                     relative inline-block"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="text-sky-400"></span>
          ABOUT ME
          <span className="text-sky-400"></span>
          <motion.div
            className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-3/4 h-1 bg-sky-500 rounded-full 
                       shadow-lg shadow-sky-500/50"
            initial={{ width: 0 }}
            whileInView={{ width: "75%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </motion.h2>
      </div>

      <motion.div
        className="relative w-full max-w-[90vw] mx-auto bg-white/5 backdrop-blur-lg rounded-3xl 
                   shadow-2xl border border-white/10 p-8 md:p-12 lg:p-16"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Futuristic Image Frame (2D Card) */}
          <motion.div
            className="relative w-full max-w-sm mx-auto"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative p-4"
              animate={{ y: [0, -10, 0] }} // Animation ลอยตัว
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="/itmy1.png" // <-- ตรวจสอบชื่อไฟล์รูปของคุณ
                alt="Tisara Profile"
                className="relative z-10 w-full h-auto rounded-lg shadow-2xl"
              />
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-sky-400 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-sky-400 rounded-br-lg" />
            </motion.div>
          </motion.div>

          {/* Right Side - Narrative Content */}
          <motion.div
            className="text-left"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
             Hey! I'm Patchararak Tisara, a third-year Vocational Certificate student studying Computer Technology at Phrae Technical College, and I've been developing websites for over a year now.
My interest sparked from watching YouTube videos of beautiful, engaging websites and designs. To be honest, I used to hate programming because of its difficulty and complexity. But at the same time, I was completely fascinated by how code could create such amazing UI/UX with so many cool animations.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              My first project... well, it wasn't as good as I'd hoped, and it was full of mistakes. But the moment I successfully debugged all those errors, everything changed.
That "boring and frustrating" feeling completely flipped into pure "fun and excitement." This passion led to amazing opportunities, like developing the official 'Course Planning & Scheduling System' for my Computer Technology department at college. It made me fall in love with designing, the look and feel of websites, and programming, and it's made me more committed to this field.
            </p>
            
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-slate-300">
              {technologies.map((tech) => (
                <li key={tech} className="flex items-center">
                  <FiCheckCircle className="text-sky-400 mr-3 flex-shrink-0" />
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;