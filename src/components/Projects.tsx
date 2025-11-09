// src/components/Projects.tsx — Carousel แนวนอน ขยับซ้าย-ขวา วนลูป
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDProjectCard, { type ProjectData } from "./ThreeDProjectCard";
import { FiArrowLeft, FiArrowRight, FiX, FiExternalLink } from "react-icons/fi";

// ====== ข้อมูลโปรเจกต์ (ตัวอย่าง) ======
const projects: ProjectData[] = [
  {
    id: 1,
    image: "/project1.png",
    title: "ระบบจองเสื้อโครงการ 3 ภาษา รอบโควค้า 68",
    preview: "ผลงานฝึกงาน ใช้ XAMPP + PHP + MySQL บันทึกข้อมูลการจองเสื้อ ใช้งานจริงที่หน้างาน",
    fullDescription:
      "ผลงานนี้เกิดขึ้นจากทีมฝึกงาน ในแผนกเทคนิคคอมพิวเตอร์วิทยาลัยเทคนิคแพร่ โดยเว็บไซต์นี้ ผลงานงานชิ้นแรก ที่ได้เอามาใช้งานจริง ซึ้งเว็บไซต์นี้เขียนด้วยโปรแกรม visual studio code มีการใช้framwork อย่าง Bootstrap เข้ามาช่วย ถาษาที่ใช้เขียนมี HTML ,CSS ,PHP,MySQL โดยเว็บไซต์นี้มีการใช้ XAMPP คือโปรแกรมลองเครื่องคอมพิวเตอร์ส่วนบุคคลของเรา ให้ทำงานใน ลักษณะของ WebServer และก็มีการเก็บข้อมูลลง Database อีกด้วย",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    link: "http://supawit.ctnphrae.com/Shirtsystem/index.php",
  },
  {
    id: 2,
    image: "/project2.png",
    title: "LMS ระบบจัดการเรียนการสอนออนไลน์",
    preview: "เว็บไซต์นี้เป็นระบบจัดการการเรียนการสอนออนไลน์",
    fullDescription:
      "ผลงานนี้เกิดขึ้นจากทีมฝึกงาน ในแผนกเทคนิคคอมพิวเตอร์วิทยาลัยเทคนิคแพร่ เป็นเว็บที่สร้างขึ้น โดยเริ่มใช้ framework bootstrap เข้ามาช่วย โดยเว็บไซต์นี้เป็นระบบจัดการการเรียนการสอนออนไลน์ ที่เอาไว้ใช้รับการเรียนการสอนแบบออนไลน์ เว็บไซต์นี้เขียนด้วยโปรแกรม visual studio code ถาษาที่ใช้เขียนมี HTML ,CSS ,PHP,SQL มีการใช้ XAMPP โปรแกรมลอง ทำงานใน ลักษณะของ WebServer และก็มีการเก็บข้อมูลลง Database อีกด้วย ",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    link: "http://bowornwit.ctnphrae.com/onlinecourse2/index.php",
  },
  {
    id: 3,
    image: "/project3.png",
    title: "PROGRESS CHART SYSTEM ONLINE",
    preview: "ระบบรายงานผลความก้าวหน้าการปฏิบัติงานนักเรียน-นักศึกษา",
    fullDescription:
      "PROGRESS CHART SYSTEM ONLINE ระบบรายงานผลความก้าวหน้าการปฏิบัติงานนักเรียน-นักศึกษา ผลงานนี้เกิดขึ้นจากทีมฝึกงาน ในแผนกเทคนิคคอมพิวเตอร์วิทยาลัยเทคนิคแพร่ (ผลงานนี้ผมเป็นผู้ออกแบบในส่วนของ frontend อย่างเดียว) โดยเว็บไซต์นี้ ใช้ framework bootstrap เข้ามาช่วย ระบบนี้เป็นระบบรายงานผลความก้าวหน้าการปฏิบัติงานนักเรียน-นักศึกษา เว็บไซต์นี้เขียนด้วยโปรแกรม visual studio code ถาษาที่ใช้เขียนมี HTML ,CSS ,PHP,SQL มีการใช้ XAMPP โปรแกรมลอง ทำงานใน ลักษณะของ WebServer และก็มีการเก็บข้อมูลลง Database อีกด้วย",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    link: "https://progresschartsystemonline.wuaze.com/PROC-1/?i=2",
  },
  {
    id: 4,
    image: "/project5.png",
    title: "คลิปวิดีโอโปรโมทหลักสูตรแผนการเรียน",
    preview: "คลิปวิดีโอ ผนกเทคนิคคอมพิวเตอร์วิทยาลัยเทคนิคแพร่",
    fullDescription:
      "คลิปวิดีโอจัดทำขึ้นจาก ทีม CTN คือทีม ตัดต่อ/ถ่ายภาพ ของแผนกเทคนิคคอมพิวเตอร์ (ตัวผมเองเป็นตากล้องของทีมครับ) รับชมผลงานได้ที่ลิ้งนี้ https://www.facebook.com/ctnphrae10/videos/1596655771253751",
    techStack: ["CanvaPro", "CapcutPro", "adobepremierepro"],
    link: " https://www.facebook.com/ctnphrae10/videos/1596655771253751",
  },
  {
    id: 5,
    image: "/project4.png",
    title: "ระบบวางแผนหลักสูตรและตารางเรียน (CPSS)",
    preview: "Course Planning & Scheduling System (CPSS)",
    fullDescription:
      "ผลงานนี้เกิดขึ้นจากทีมฝึกงาน ในแผนกเทคนิคคอมพิวเตอร์วิทยาลัยเทคนิคแพร่ เป็นโปรเจ็คFinal ของการฝึกงานที่ใช้เวลาทำนานที่สุดโดยระยะเวลาในการทำคือ1เดือนเต็ม เดิมทีเว็บไซต์นี้จะใช้ framework laravel เข้ามาช่วย แต่ด้วยเหตุผลที่ตัวของServer ของแผนกเทคนิคคอมนั้นไม่รองรับ เลยมีการเปลี่ยนแปลงมาใช้ framework react/JS และ tailwind.css  โดยเว็บไซต์นี้เป็นระบบวางแผนหลักสูตรและตารางเรียน เว็บไซต์นี้เขียนด้วยโปรแกรม visual studio code ถาษาที่ใช้เขียนมี HTML ,CSS ,PHP,MySQL มีการใช้ XAMPP โปรแกรมลอง ทำงานใน ลักษณะของ WebServer และก็มีการเก็บข้อมูลลง Database อีกด้วย ",
    techStack: ["ReactJS", "Tailwind.css", "PHP", "MySQL", "HTML5", "CSS3"],
    link: "http://bowornwit.ctnphrae.com/CPSS/",
  },
];

// ====== ค่าคงที่ของคารูเซล ======
const CARD_W = 340; // กว้างการ์ด (ต้องตรงกับ ThreeDProjectCard)
const GAP = 24; // ระยะห่างการ์ด
const STEP = CARD_W + GAP;

export default function Projects() {
  const [index, setIndex] = useState(0); // ตำแหน่งการ์ดตรงกลาง
  const [selected, setSelected] = useState<ProjectData | null>(null);
  const [isHover, setIsHover] = useState(false);

  const count = projects.length;

  // ====== ฟังก์ชันวนลูป ======
  const wrap = (v: number) => {
    const m = ((v % count) + count) % count;
    return m;
  };
  const next = () => setIndex((i) => wrap(i + 1));
  const prev = () => setIndex((i) => wrap(i - 1));

  // ====== Auto-play (หยุดเมื่อเปิด Modal หรือ hover) ======
  useEffect(() => {
    if (selected || isHover) return;
    const t = setInterval(next, 3000);
    return () => clearInterval(t);
  }, [selected, isHover]);

  // ====== Drag/Swipe แทร็ก ======
  const trackRef = useRef<HTMLDivElement>(null);
  const dragX = useRef(0);

  const onDragEnd = (_: any, info: { offset: { x: number } }) => {
    dragX.current += info.offset.x;
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  // ====== คำนวณตำแหน่งการ์ดบนแทร็กแบบวนลูป ======
  const items = useMemo(() => {
    return projects.map((p, i) => {
      let off = i - index;
      const half = Math.floor(count / 2);
      if (off < -half) off += count;
      if (off > half) off -= count;

      const x = off * STEP;

      const dist = Math.abs(off);
      const scale = 1 - dist * 0.08;
      const opacity = 1 - dist * 0.25;

      return { p, x, scale, opacity, isCenter: off === 0 };
    });
  }, [index, count]);

  // ====== Mobile? (แสดงแบบ list) ======
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <section id="projects" className="py-16">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-slate-100">MY PROJECTS</h2>
          {/* เส้นสีฟ้าใต้หัวข้อ */}
          <div className="mx-auto mt-2 h-1 w-40 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50" />
        </div>

        <div className="flex flex-col items-center gap-6">
          {projects.map((p) => (
            <ThreeDProjectCard
              key={p.id}
              layoutId={`mobile-${p.id}`}
              project={p}
              isCenter
              scale={1}
              opacity={1}
              onClick={() => setSelected(p)}
            />
          ))}
        </div>

        {/* Modal (mobile) */}
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                onClick={() => setSelected(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                layoutId={`mobile-${selected.id}`}
                className="fixed inset-0 m-auto w-[92vw] h-[82vh] max-w-4xl flex flex-col bg-slate-800 rounded-2xl shadow-2xl border border-sky-400 overflow-hidden z-50"
              >
                <motion.img
                  layoutId={`mobile-${selected.id}-image`}
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 overflow-y-auto">
                  <motion.h3 layoutId={`mobile-${selected.id}-title`} className="text-3xl font-extrabold text-sky-400 mb-3">
                    {selected.title}
                  </motion.h3>
                  <motion.p layoutId={`mobile-${selected.id}-description`} className="text-slate-200 leading-relaxed">
                    {selected.fullDescription ?? selected.description ?? ""}
                  </motion.p>
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-600 rounded-lg text-white font-bold hover:bg-sky-700"
                    >
                      View Project <FiExternalLink />
                    </a>
                  )}
                </div>
                <button className="absolute top-3 right-3 text-slate-300 hover:text-white" onClick={() => setSelected(null)}>
                  <FiX size={32} />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    );
  }

  // ====== Desktop: แทร็กสไลด์วนลูป ======
  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <motion.h2
        className="text-6xl lg:text-7xl font-extrabold text-slate-100 mb-16 relative inline-block text-center w-full"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <span className="text-sky-400"></span>
        MY PROJECTS
        <span className="text-sky-400"></span>
        <motion.div
          className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-1/2 md:w-1/4 h-1 bg-sky-500 rounded-full shadow-lg shadow-sky-500/50"
          initial={{ width: 0 }}
          whileInView={{ width: "25%" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </motion.h2>

      {/* Track */}
      <motion.div
        ref={trackRef}
        className="relative mx-auto max-w-7xl h-[520px] flex items-center overflow-visible"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
      >
        {/* กลุ่มการ์ด */}
        {items.map(({ p, x, scale, opacity, isCenter }) => (
          <motion.div key={p.id} className="absolute will-change-transform" style={{ left: "50%", transform: `translateX(${x}px) translateX(-50%)` }}>
            <ThreeDProjectCard
              layoutId={`desktop-${p.id}`}
              project={p}
              isCenter={isCenter}
              scale={scale}
              opacity={opacity}
              onClick={() => setSelected(p)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Controls */}
      <AnimatePresence>
        {!selected && (
          <motion.div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={prev} className="p-3 rounded-full bg-sky-600/60 hover:bg-sky-500/60 backdrop-blur border border-sky-400 text-white shadow-lg">
              <FiArrowLeft size={24} />
            </button>

            {/* Dots */}
            {projects.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i === index ? "bg-sky-400" : "bg-slate-500 hover:bg-slate-400"}`} onClick={() => setIndex(i)} />
            ))}

            <button onClick={next} className="p-3 rounded-full bg-sky-600/60 hover:bg-sky-500/60 backdrop-blur border border-sky-400 text-white shadow-lg">
              <FiArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal (desktop) */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" onClick={() => setSelected(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              layoutId={`desktop-${selected.id}`}
              className="fixed inset-0 m-auto w-[90vw] h-[80vh] max-w-4xl flex flex-col md:flex-row bg-slate-800 rounded-2xl shadow-2xl border border-sky-400 overflow-hidden z-50"
            >
              <motion.div className="w-full md:w-1/2 h-64 md:h-full">
                <motion.img layoutId={`desktop-${selected.id}-image`} src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="w-full md:w-1/2 p-6 overflow-y-auto">
                <motion.h3 layoutId={`desktop-${selected.id}-title`} className="text-4xl font-extrabold text-sky-400 mb-4">
                  {selected.title}
                </motion.h3>
                <motion.p layoutId={`desktop-${selected.id}-description`} className="text-lg text-slate-200 leading-relaxed mb-6">
                  {selected.fullDescription ?? selected.description ?? ""}
                </motion.p>

                <h4 className="text-xl font-bold text-slate-100 mb-3">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.techStack.map((t) => (
                    <span key={t} className="bg-sky-500/20 text-sky-300 rounded-full px-3 py-1 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {selected.link && (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-sky-600 rounded-lg text-white font-bold hover:bg-sky-700">
                    View Project <FiExternalLink />
                  </a>
                )}
              </div>

              <button className="absolute top-4 right-4 text-slate-300 hover:text-white" onClick={() => setSelected(null)}>
                <FiX size={32} />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
