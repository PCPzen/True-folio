import type { AgentAction, LeadPayload, SectionId } from "../types";
import { profileData } from "./profile";

export const QUICK_REPLY_CHIPS = [
  "แนะนำตัว",
  "ทักษะ & Tech Stack",
  "ดูโปรเจกต์เด่น",
  "ช่องทางติดต่อ",
] as const;

export const SECTION_GREETINGS: Record<SectionId, string> = {
  home: "สวัสดีครับ! ผมคือผู้ช่วย AI ประจำพอร์ตของ Pattle — กดคุยหรือถามเรื่องผลงานได้เลยครับ",
  about: "ส่วนนี้เล่าที่มาของผม ตั้งแต่ทำระบบเว็บให้แผนกจนมาทำ Full-Stack, Security และ AI Agent ครับ",
  skills: "ตรงนี้เป็น Tech Stack ที่ผมใช้จริงในโปรเจกต์ แบ่งเป็น 4 หมวดครับ",
  projects: "ลองกดกรองหมวดหมู่ หรือคลิกที่การ์ดโปรเจกต์เพื่อดู Architecture Flow ด้านในได้เลยครับ",
};

export interface BotRouteResult {
  reply: string;
  matchedIntent: boolean;
  actions?: AgentAction[];
  chips?: string[];
}

export function routeBotIntent(input: string): BotRouteResult {
  const q = input.trim().toLowerCase();

  if (
    q.includes("แนะนำตัว") ||
    q.includes("ใคร") ||
    q.includes("about") ||
    q.includes("ประวัติ") ||
    q.includes("pattle")
  ) {
    return {
      matchedIntent: true,
      reply: `ผมชื่อ ${profileData.fullName} (${profileData.nickname}) นักศึกษาสาขาเทคโนโลยีคอมพิวเตอร์ วิทยาลัยเทคนิคแพร่ครับ ถนัดทั้งการวิเคราะห์ระบบ พัฒนาเว็บ (React / Next.js / PHP / MySQL) และกำลังมุ่งสาย AI Agent Builder & Workflow Automation เพื่อสร้างบอทที่เชื่อมต่อ API และทำงานได้จริงครับ`,
      actions: [
        { type: "scroll", label: "ไปที่ส่วน About Me", target: "about" },
        { type: "openProject", label: "ดู Multi-Agent AI Orchestrator", projectId: 201 },
      ],
      chips: ["ทักษะ & Tech Stack", "ดูโปรเจกต์เด่น", "ช่องทางติดต่อ"],
    };
  }

  if (
    q.includes("ทักษะ") ||
    q.includes("skill") ||
    q.includes("ai") ||
    q.includes("stack") ||
    q.includes("ทำอะไรได้")
  ) {
    return {
      matchedIntent: true,
      reply:
        "Tech Stack หลักที่ผมใช้จริงในโปรเจกต์แบ่งเป็น 4 ด้านครับ: 1) AI & Multi-Agent (Multi-Agent Orchestrator 16 ตัว, Chatbot Flow, Prompt & Guardrails) 2) Automation & Security (PowerShell Windows EDR, Python, GitHub Actions CI, Webhook) 3) Full-Stack Web & DB (Next.js 16, React 19, Prisma, Supabase PostgreSQL, PHP/MySQL) และ 4) Dev Tools & 3D (Git, Vite, Three.js, Figma)",
      actions: [{ type: "scroll", label: "ดู Bento Skills Matrix", target: "skills" }],
      chips: ["ดูโปรเจกต์เด่น", "แนะนำตัว", "ช่องทางติดต่อ"],
    };
  }

  if (
    q.includes("โปรเจกต์") ||
    q.includes("ผลงาน") ||
    q.includes("project") ||
    q.includes("automation") ||
    q.includes("chatbot") ||
    q.includes("agent") ||
    q.includes("security") ||
    q.includes("hotel")
  ) {
    return {
      matchedIntent: true,
      reply:
        "ผมมี 3 โปรเจกต์เด่นล่าสุดครับ: 1) Web Team v3 (Multi-Agent AI Orchestrator 16 ตัว), 2) Security Sentinel Ultra v8.0 (Windows EDR ด้วย PowerShell), และ 3) WebAppHotel (ระบบจัดการหอพัก Next.js + Prisma + Supabase) กดปุ่มด้านล่างเพื่อเปิดดู Architecture Flow ได้เลยครับ!",
      actions: [
        { type: "openProject", label: "ดู Flow: Multi-Agent AI", projectId: 201 },
        { type: "openProject", label: "ดู Flow: Security Sentinel", projectId: 202 },
        { type: "openProject", label: "ดู Flow: WebAppHotel", projectId: 203 },
      ],
      chips: ["ทักษะ & Tech Stack", "ช่องทางติดต่อ"],
    };
  }

  if (
    q.includes("ติดต่อ") ||
    q.includes("contact") ||
    q.includes("สัมภาษณ์") ||
    q.includes("ฝึกงาน") ||
    q.includes("hr") ||
    q.includes("email") ||
    q.includes("github")
  ) {
    return {
      matchedIntent: true,
      reply:
        "ตอนนี้ผมเปิดรับโอกาสฝึกงาน / ร่วมงานสาย Web & AI (ทั้ง WFH และ Remote) ครับ สามารถฝากข้อความติดต่อกลับในแชทนี้ได้เลย หรือดูลิงก์ GitHub / Social ด้านล่างของหน้าเว็บครับ",
      actions: [
        { type: "openLeadForm", label: "เปิดฟอร์มฝากข้อความติดต่อกลับ" },
      ],
      chips: ["ดูโปรเจกต์เด่น", "แนะนำตัว"],
    };
  }

  return {
    matchedIntent: false,
    reply: `ขอบคุณสำหรับคำถาม "${input}" ครับ! ตอนนี้ผมทำงานด้วย Hybrid Intent Router — ลองเลือกหัวข้อด้านล่างเพื่อให้ผมพาชมทักษะ Tech Stack, โปรเจกต์เด่น พร้อมดู Architecture Flow หรือฝากข้อมูลติดต่อกลับได้เลยครับ`,
    actions: [
      { type: "scroll", label: "ดูผลงานทั้งหมด", target: "projects" },
      { type: "openLeadForm", label: "ฝากข้อความติดต่อกลับ" },
    ],
    chips: [...QUICK_REPLY_CHIPS],
  };
}

export async function streamOrFetchBotReply(
  userMessage: string,
  history: Array<{ role: "user" | "bot"; text: string }>,
  onToken: (partial: string) => void
): Promise<BotRouteResult> {
  const localResult = routeBotIntent(userMessage);

  // Hybrid 0-Token Fast Path: Known intents & Quick Replies never call the LLM API
  if (localResult.matchedIntent) {
    return localResult;
  }

  const apiUrl = import.meta.env.VITE_CHAT_API_URL as string | undefined;

  if (!apiUrl) {
    return localResult;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: userMessage,
        history: history.slice(-6),
      }),
    });

    if (!response.ok) {
      return localResult;
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("text/event-stream") && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload) as { token?: string; text?: string };
              accumulated += parsed.token ?? parsed.text ?? "";
            } catch {
              accumulated += payload;
            }
            onToken(accumulated);
          }
        }
      }

      if (accumulated.trim().length > 0) {
        return {
          matchedIntent: false,
          reply: accumulated.trim(),
          actions: localResult.actions,
          chips: localResult.chips,
        };
      }
    }

    const data = (await response.json()) as {
      reply?: string;
      text?: string;
      actions?: AgentAction[];
    };
    const remoteText = data.reply ?? data.text;
    if (remoteText) {
      return {
        matchedIntent: false,
        reply: remoteText,
        actions: data.actions && data.actions.length > 0 ? data.actions : localResult.actions,
        chips: localResult.chips,
      };
    }
  } catch {
    // Graceful fallback to local Intent Router when external endpoint is offline
  }

  return localResult;
}

export async function submitLeadToWebhook(
  payload: LeadPayload
): Promise<{ ok: boolean; mode: "webhook" | "simulated" }> {
  const webhookUrl = import.meta.env.VITE_WEBHOOK_URL as string | undefined;

  if (!webhookUrl) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: true, mode: "simulated" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, mode: "webhook" };
  } catch {
    return { ok: false, mode: "webhook" };
  }
}
