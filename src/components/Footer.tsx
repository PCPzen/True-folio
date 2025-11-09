// src/components/Footer.tsx
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

// Variants (ใส่ชนิด Variants ให้ TS ถูกต้อง)
const footerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Footer = () => {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="py-5 border-t border-slate-500"
    >
      <div className="container mx-auto px-8 text-center py-10">
        {/* Social Links */}
        <motion.div className="flex justify-center gap-8 mb-6" variants={itemVariants}>
          <motion.a
            href="https://github.com/PCPzen"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaGithub size={28} />
          </motion.a>

          <motion.a
            href="https://www.facebook.com/phatchararak.minimy"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaFacebook size={28} />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/pattle___/"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-400 transition-colors duration-300"
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaInstagram size={28} />
          </motion.a>
        </motion.div>

        {/* Copyright */}
        <motion.p className="text-slate-300 text-sm" variants={itemVariants}>
          &copy; {new Date().getFullYear()} Tisara My portfolio. All rights reserved.
        </motion.p>
        <motion.p className="text-slate-300 text-xs mt-2" variants={itemVariants}>
          Designed &amp; Built by Gemini_Pro@Tisara
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;
