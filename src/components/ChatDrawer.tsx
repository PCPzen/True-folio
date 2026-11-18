import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSend,
  FiX,
  FiCpu,
  FiArrowUpRight,
  FiCheckCircle,
  FiUserPlus,
} from "react-icons/fi";
import type { AgentAction, BotState, ChatMessage, ProjectCategory, SectionId } from "../types";
import {
  QUICK_REPLY_CHIPS,
  streamOrFetchBotReply,
  submitLeadToWebhook,
} from "../data/botKnowledge";

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  botState: BotState;
  onBotStateChange: (state: BotState) => void;
  onScrollToSection: (section: SectionId) => void;
  onFilterProjects: (category: ProjectCategory) => void;
  onOpenProject: (projectId: number) => void;
  initialPrompt?: string | null;
  onConsumeInitialPrompt?: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome-msg",
  role: "bot",
  text: "สวัสดีครับ! ผมคือผู้ช่วย AI ประจำพอร์ตของ Pattle ถามเรื่องทักษะ Tech Stack, ดูโปรเจกต์เด่น หรือให้ผมพาเลื่อนไปดูส่วนต่างๆ ได้เลยครับ",
  timestamp: "Online",
  chips: [...QUICK_REPLY_CHIPS],
};

export default function ChatDrawer({
  isOpen,
  onClose,
  botState,
  onBotStateChange,
  onScrollToSection,
  onFilterProjects,
  onOpenProject,
  initialPrompt,
  onConsumeInitialPrompt,
}: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm, botState]);

  const handleSend = async (textOverride?: string) => {
    const query = (textOverride ?? input).trim();
    if (!query || botState === "thinking") return;

    if (!textOverride) setInput("");

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    onBotStateChange("thinking");

    // Brief natural delay for intent routing feel
    await new Promise((resolve) => setTimeout(resolve, 420));

    const botMsgId = `bot-${Date.now()}`;
    let streamedInserted = false;

    const result = await streamOrFetchBotReply(
      query,
      messages.map((m) => ({ role: m.role, text: m.text })),
      (partialText) => {
        onBotStateChange("speaking");
        if (!streamedInserted) {
          streamedInserted = true;
          setMessages((prev) => [
            ...prev,
            {
              id: botMsgId,
              role: "bot",
              text: partialText,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((m) => (m.id === botMsgId ? { ...m, text: partialText } : m))
          );
        }
      }
    );

    onBotStateChange("speaking");
    const finalMsg: ChatMessage = {
      id: botMsgId,
      role: "bot",
      text: result.reply,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actions: result.actions,
      chips: result.chips,
    };

    setMessages((prev) =>
      streamedInserted
        ? prev.map((m) => (m.id === botMsgId ? finalMsg : m))
        : [...prev, finalMsg]
    );

    window.setTimeout(() => {
      onBotStateChange("idle");
    }, 1200);
  };

  // Support external prompt trigger (e.g. "Ask AI about this project")
  useEffect(() => {
    if (isOpen && initialPrompt) {
      void handleSend(initialPrompt);
      onConsumeInitialPrompt?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialPrompt]);

  const executeAgentAction = (action: AgentAction) => {
    if (action.type === "scroll") {
      onScrollToSection(action.target);
    } else if (action.type === "filter") {
      onFilterProjects(action.category);
      onScrollToSection("projects");
    } else if (action.type === "openProject") {
      onOpenProject(action.projectId);
    } else if (action.type === "openLeadForm") {
      setShowLeadForm(true);
      setLeadSuccess(null);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadEmail.trim()) return;
    setLeadSubmitting(true);

    const res = await submitLeadToWebhook({
      name: leadName.trim(),
      company: leadCompany.trim() || "Not specified",
      email: leadEmail.trim(),
      message: leadMessage.trim() || "Interested in AI Agent Builder internship",
      source: "chat_drawer",
      submittedAt: new Date().toISOString(),
    });

    setLeadSubmitting(false);

    if (res.ok) {
      setLeadSuccess(
        res.mode === "webhook"
          ? "ส่งข้อมูลไปยัง Webhook สำเร็จแล้วครับ!"
          : "บันทึกข้อมูลเรียบร้อย (Demo Mode — พร้อมเชื่อม Webhook)"
      );
      setLeadName("");
      setLeadCompany("");
      setLeadEmail("");
      setLeadMessage("");
      window.setTimeout(() => setShowLeadForm(false), 1800);
    } else {
      setLeadSuccess("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Pattle AI Agent Chat Drawer"
          className="fixed bottom-24 right-4 sm:right-5 z-50 flex h-[540px] max-h-[75vh] w-[calc(100vw-2rem)] sm:w-[400px] flex-col overflow-hidden rounded-2xl border border-[#00AEEF]/40 bg-[#060D1A]/95 shadow-2xl shadow-[#00AEEF]/20 backdrop-blur-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#0A192F]/90 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00AEEF]/15 border border-[#00AEEF]/40 text-[#38BDF8]">
                <FiCpu size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Pattle AI Agent</h3>
                <p className="font-mono text-[11px] text-[#38BDF8]">
                  Hybrid Intent Router · Portfolio Assistant
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setShowLeadForm((v) => !v);
                  setLeadSuccess(null);
                }}
                title="ฝากข้อมูลติดต่อกลับ (HR Lead)"
                className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-300 hover:border-[#00AEEF]/50 hover:text-[#38BDF8] transition-colors"
              >
                <FiUserPlus size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat drawer"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#00AEEF] text-[#060D1A] font-medium rounded-br-sm"
                      : "bg-[#0F213D] border border-white/10 text-slate-200 rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Agentic UI Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    {msg.actions.map((action, idx) => (
                      <button
                        key={`${msg.id}-act-${idx}`}
                        type="button"
                        onClick={() => executeAgentAction(action)}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#00AEEF]/40 bg-[#00AEEF]/10 px-2.5 py-1 text-xs font-medium text-[#38BDF8] hover:bg-[#00AEEF]/25 transition-colors"
                      >
                        <span>{action.label}</span>
                        <FiArrowUpRight size={12} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Reply Chips */}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.chips.map((chip) => (
                      <button
                        key={`${msg.id}-chip-${chip}`}
                        type="button"
                        onClick={() => void handleSend(chip)}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:border-[#00AEEF]/60 hover:text-[#38BDF8] transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {botState === "thinking" && (
              <div className="flex items-start">
                <div className="rounded-2xl rounded-bl-sm border border-white/10 bg-[#0F213D] px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-[#38BDF8] animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            {/* Inline HR Lead Capture Mini-Form */}
            {showLeadForm && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleLeadSubmit}
                className="rounded-xl border border-[#00AEEF]/40 bg-[#0A192F] p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#38BDF8]">
                    HR / Recruiter Quick Contact
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowLeadForm(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <FiX size={14} />
                  </button>
                </div>

                {leadSuccess ? (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 p-2.5 text-xs text-emerald-300">
                    <FiCheckCircle className="shrink-0" />
                    <span>{leadSuccess}</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="text"
                      required
                      placeholder="ชื่อผู้ติดต่อ / Name *"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#060D1A] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00AEEF] focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="บริษัท / Organization"
                      value={leadCompany}
                      onChange={(e) => setLeadCompany(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#060D1A] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00AEEF] focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="อีเมลติดต่อกลับ / Email *"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#060D1A] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00AEEF] focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="ข้อความเพิ่มเติม (เช่น นัดสัมภาษณ์)"
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-[#060D1A] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-[#00AEEF] focus:outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full rounded-lg bg-[#00AEEF] py-2 text-xs font-bold text-[#060D1A] hover:bg-[#38BDF8] disabled:opacity-60 transition-colors"
                    >
                      {leadSubmitting ? "กำลังส่งข้อมูล..." : "ส่งข้อมูลติดต่อกลับ"}
                    </button>
                  </>
                )}
              </motion.form>
            )}

            <div ref={listEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSend();
            }}
            className="flex items-center gap-2 border-t border-white/10 bg-[#0A192F]/90 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="พิมพ์ถามเกี่ยวกับทักษะ, โปรเจกต์, ติดต่อ..."
              className="flex-1 rounded-xl border border-white/15 bg-[#060D1A] px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-[#00AEEF] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || botState === "thinking"}
              aria-label="Send message"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00AEEF] text-[#060D1A] hover:bg-[#38BDF8] disabled:opacity-40 transition-colors"
            >
              <FiSend size={16} />
            </button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
