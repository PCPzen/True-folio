export type SectionId = "home" | "about" | "skills" | "projects";

export type ProjectCategory = "All" | "AI & Chatbot" | "Automation" | "Web System";

export type BotState = "idle" | "thinking" | "speaking";

export interface ArchitectureNode {
  step: string;
  label: string;
  detail: string;
  nodeType: "trigger" | "ai" | "logic" | "data" | "output";
}

export interface ProjectData {
  id: number;
  image: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  featured?: boolean;
  preview: string;
  fullDescription: string;
  techStack: string[];
  architectureFlow: ArchitectureNode[];
  link?: string;
  githubUrl?: string;
  liveDemoLabel?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  description: string;
  iconKey: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  accent: string;
  spanClass: string;
  skills: SkillItem[];
}

export type AgentAction =
  | {
      type: "scroll";
      label: string;
      target: SectionId;
    }
  | {
      type: "filter";
      label: string;
      category: ProjectCategory;
    }
  | {
      type: "openProject";
      label: string;
      projectId: number;
    }
  | {
      type: "openLeadForm";
      label: string;
    };

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
  timestamp: string;
  actions?: AgentAction[];
  chips?: string[];
}

export interface LeadPayload {
  name: string;
  company: string;
  email: string;
  message: string;
  source: "chat_drawer" | "contact_section";
  submittedAt: string;
}
