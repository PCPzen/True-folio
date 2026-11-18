import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ThreeDBot from "./components/ThreeDBot";
import ChatDrawer from "./components/ChatDrawer";
import AmbientBackground from "./components/AmbientBackground";
import CommandPalette from "./components/CommandPalette";
import QuickBriefModal from "./components/QuickBriefModal";
import type { BotState, ProjectCategory, SectionId } from "./types";

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [botState, setBotState] = useState<BotState>("idle");
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>("All");
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [queuedPrompt, setQueuedPrompt] = useState<string | null>(null);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const sectionIds: SectionId[] = ["home", "about", "skills", "projects"];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.4;
      let currentSection: SectionId = "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - offset) {
          currentSection = id;
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((section: SectionId) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleOpenProject = useCallback((projectId: number) => {
    setProjectFilter("All");
    setSelectedProjectId(projectId);
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleAskAiAboutProject = useCallback((projectTitle: string) => {
    setQueuedPrompt(`ช่วยอธิบายจุดเด่นและโปรเจกต์ "${projectTitle}" ให้หน่อย`);
    setIsChatOpen(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060D1A] text-slate-200">
      <AmbientBackground />

      <Navbar
        activeSection={activeSection}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCommandPalette={() => setIsCommandOpen(true)}
      />

      <main className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 w-full">
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onOpenBrief={() => setIsBriefOpen(true)}
        />
        <About />
        <Skills />
        <Projects
          activeFilter={projectFilter}
          onFilterChange={setProjectFilter}
          selectedProjectId={selectedProjectId}
          onSelectProjectId={setSelectedProjectId}
          onAskAiAboutProject={handleAskAiAboutProject}
        />
      </main>

      <Footer />

      <ThreeDBot
        currentSection={activeSection}
        botState={botState}
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((v) => !v)}
      />

      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        botState={botState}
        onBotStateChange={setBotState}
        onScrollToSection={scrollToSection}
        onFilterProjects={setProjectFilter}
        onOpenProject={handleOpenProject}
        initialPrompt={queuedPrompt}
        onConsumeInitialPrompt={() => setQueuedPrompt(null)}
      />

      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onScrollToSection={scrollToSection}
        onFilterProjects={setProjectFilter}
        onOpenProject={handleOpenProject}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenBrief={() => setIsBriefOpen(true)}
      />

      <QuickBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenProject={handleOpenProject}
      />
    </div>
  );
}

export default App;
