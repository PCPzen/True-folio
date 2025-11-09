// src/components/Skills.tsx

import { motion } from "framer-motion";

// 1. Import ไอคอนทักษะที่คุณต้องการโชว์
// (คุณสามารถเพิ่ม/ลบ ได้ตามต้องการจาก 'react-icons/si')
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiNodedotjs, SiGit,
  SiFigma, SiVite, SiHtml5, SiCss3, SiMysql, SiPhp, SiBootstrap, SiLua, SiArduino,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc"; // ⬅️ VS Code มาจากชุด vsc

// 2. สร้าง "คลังทักษะ" ของคุณ (อัปเดตใหม่)
// เราจะกำหนดไอคอน, ชื่อ, และ "สี" สำหรับเอฟเฟกต์เรืองแสง
const skillsList = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Vite", Icon: SiVite, color: "#646CFF" },
  { name: "Visual Studio Code", Icon: VscVscode, color: "#007ACC" },
  { name: "Lua", Icon: SiLua, color: "#2C2D72" },
  { name: "Arduino IDE", Icon: SiArduino, color: "#00979D" },
];
// --- Animation Variants ---
// 3. Variants สำหรับ "Container" (Grid)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, // สั่งให้ "ลูก" (การ์ด) ทยอยปรากฏ ห่างกัน 0.1 วินาที
      delayChildren: 0.2,
    },
  },
};

// 4. Variants สำหรับ "Item" (การ์ดแต่ละใบ)
const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // เริ่มต้นที่: ล่องหน และอยู่ต่ำกว่าตำแหน่งจริง 50px
  visible: { 
    opacity: 1, 
    y: 0, // เคลื่อนที่กลับมาที่ตำแหน่งจริง
    transition: { duration: 0.6 } 
  },
};

const Skills = () => {
  return (
    // 5. อย่าลืม id="skills" เพื่อให้ Bot ทำงานได้!
    <section id="skills" className="py-20 md:py-32">
      {/* --- หัวข้อ (สไตล์เดียวกับ About Me) --- */}
      <motion.h2
        className="text-6xl lg:text-7xl font-extrabold text-slate-100 mb-16
                   relative inline-block text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="text-sky-400"></span>
        MY SKILLS
        <span className="text-sky-400"></span>
        <motion.div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1/2 md:w-1/4 h-1 bg-sky-500 rounded-full 
                     shadow-lg shadow-sky-500/50"
          initial={{ width: 0 }}
          whileInView={{ width: "25%" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </motion.h2>

      {/* --- 6. "Grid" ที่โชว์การ์ดทักษะ --- */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsList.map((skill) => (
          <motion.div
            key={skill.name}
            className="group relative flex flex-col items-center justify-center p-6 
                       bg-white/5 backdrop-blur-lg rounded-2xl 
                       shadow-lg border border-white/10
                       transition-all duration-300 hover:shadow-sky-500/20 hover:border-sky-500/30"
            variants={itemVariants}
            // 7. ส่ง "สี" เข้าไปใน CSS Variable
            style={{ '--skill-color': skill.color } as React.CSSProperties}
          >
            {/* 8. "ไอคอน" ที่จะลอยและเรืองแสง */}
            <div className="transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
              {skill.Icon ? (
                <skill.Icon
                  size={56}
                  className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_var(--skill-color)]"
                  style={{ color: skill.color }}
                />
              ) : (
                <div className="w-14 h-14 rounded bg-slate-700" />
              )}
            </div>
            {/* 11. "ชื่อทักษะ" */}
            <p className="mt-4 font-mono-tech text-slate-200 text-lg">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;

