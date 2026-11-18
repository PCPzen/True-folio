import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { profileData } from "../data/profile";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#060D1A]/90 py-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-12 lg:px-20 text-center sm:text-left">
        <div>
          <p className="font-bold text-slate-100">
            {profileData.brandName}{" "}
            <span className="font-mono text-xs text-[#38BDF8] ml-1">
              · AI Agent Builder Portfolio
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            &copy; {new Date().getFullYear()} {profileData.fullName} ({profileData.nickname}). Built with React, Three.js &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profileData.socials.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#38BDF8] transition-colors"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={profileData.socials.facebook}
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#38BDF8] transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href={profileData.socials.instagram}
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-[#38BDF8] transition-colors"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
