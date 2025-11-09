import { motion } from 'framer-motion';

export interface ProjectData {
  id: number;
  image: string;
  title: string;
  preview?: string;
  fullDescription?: string;
  description?: string;
  techStack: string[];
  link?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  onClick: () => void;
  layoutId: string;
  isCenter: boolean;
  scale: number;
  opacity: number;
}

export default function ThreeDProjectCard({
  project,
  onClick,
  layoutId,
  isCenter,
  scale,
  opacity,
}: ProjectCardProps) {
  const outerText = project.preview ?? project.description ?? '';

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="
        relative rounded-2xl overflow-hidden cursor-pointer
        border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl
        w-[300px] md:w-[340px]
        h-auto md:h-[430px]      /* มือถือปล่อยสูงอัตโนมัติ */
        will-change-transform
      "
      style={{ scale, opacity, transformOrigin: '50% 90%' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
    >
      {/* รูปภาพ */}
      <motion.img
        layoutId={`${layoutId}-image`}
        src={project.image}
        alt={project.title}
        className="
          block w-full object-cover
          h-44 sm:h-48 md:absolute md:inset-0 md:h-1/2
        "
      />

      {/* เฉพาะเดสก์ท็อป: พื้นทึบครึ่งล่างทับรูปเพื่อให้อ่านง่าย */}
      <div className="hidden md:block absolute top-1/2 left-0 right-0 bottom-0 bg-slate-900/70" />

      {/* เนื้อหา
          - มือถือ: กล่องพื้นหลังทึบวาง 'ถัดจากรูป' (ไม่ absolute)
          - เดสก์ท็อป: วางชิดล่างแบบ absolute (ทับครึ่งล่าง)
      */}
      <div
        className="
          p-5
          bg-slate-900/70 md:bg-transparent
          md:absolute md:inset-x-0 md:bottom-0
        "
      >
        <motion.h3
          layoutId={`${layoutId}-title`}
          className="
            text-center font-extrabold text-sky-300
            text-xl sm:text-2xl leading-tight
          "
        >
          {project.title}
        </motion.h3>

        <motion.p
          layoutId={`${layoutId}-description`}
          className="
            mt-2 text-center text-slate-200/90 leading-snug
            text-sm sm:text-[15px]
            line-clamp-3
          "
        >
          {outerText}
        </motion.p>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="bg-sky-500/20 text-sky-200 rounded-full px-3 py-0.5 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        {project.link && isCenter && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="
              mt-4 block w-full rounded-lg bg-sky-600 py-2 text-center
              text-white font-semibold hover:bg-sky-500
            "
          >
            View Project
          </a>
        )}
      </div>
    </motion.div>
  );
}
