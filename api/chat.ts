import type { AgentAction, ProjectCategory, SectionId } from "../src/types";

export const config = {
  runtime: "edge",
};

interface IncomingMessage {
  role: "user" | "bot";
  text: string;
}

interface GeminiFunctionCall {
  name?: string;
  args?: Record<string, unknown>;
}

interface GeminiPart {
  text?: string;
  functionCall?: GeminiFunctionCall;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
}

const RATE_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPT = `คุณคือผู้ช่วย AI ประจำ Portfolio ของ พัชรารักษ์ ติสระ (Pattle) นักศึกษาสาขาเทคโนโลยีคอมพิวเตอร์ วิทยาลัยเทคนิคแพร่ ที่กำลังเปิดรับโอกาสฝึกงานและร่วมงานสาย Full-Stack Web, Automation และ AI Agent (WFH / Remote)

ข้อมูลจริงของ Pattle (ห้ามแต่งข้อมูลนอกเหนือจากนี้):
- จุดเด่น: ออกแบบ Chatbot Flow, Intent Routing, Multi-Agent Orchestration, System Analysis และ Full-Stack Web/Automation
- Tech Stack 4 ด้าน:
  1) AI & Multi-Agent: Multi-Agent Orchestrator 16 บทบาท (Antigravity/Claude Code), Chatbot Flow & Intent, Prompt & Guardrails, Agentic UI & Webhook
  2) Automation & Security: PowerShell Windows EDR, Python Scripting (build.py, CLI), GitHub Actions CI, REST API & Webhook
  3) Full-Stack Web & DB: Next.js 16, React 19, Prisma ORM, Supabase Auth & PostgreSQL, PHP & MySQL
  4) Dev Tools & 3D: Git & GitHub, Three.js / Framer Motion, Vite & TypeScript, Figma
- โปรเจกต์ในพอร์ต (ใช้ projectId ตามนี้เมื่อเรียก open_project_modal):
  - id 201: Web Team v3 — Multi-Agent AI Orchestrator (AI & Chatbot)
  - id 202: Security Sentinel Ultra v8.0 Windows EDR (Automation)
  - id 203: Dormitory Management System / WebAppHotel (Web System)
  - id 1: ระบบจองเสื้อโครงการ 3 ภาษา (Web System)
  - id 2: LMS ระบบจัดการเรียนการสอนออนไลน์ (Web System)
  - id 3: PROGRESS CHART SYSTEM ONLINE (Web System)
  - id 4: คลิปวิดีโอโปรโมทหลักสูตร (Automation)

กฎการตอบ:
1. ตอบเป็นภาษาไทยสุภาพ กระชับ ชัดเจน (หรืออังกฤษถ้าผู้ใช้ถามภาษาอังกฤษ)
2. ตอบเฉพาะเรื่องเกี่ยวกับ Pattle, ทักษะ, โปรเจกต์, หรือการติดต่อฝึกงาน หากถามนอกเรื่องให้ปฏิเสธอย่างสุภาพและพากลับมาที่ผลงาน
3. ใช้ tool calls (scroll_to_section, filter_projects, open_project_modal, open_lead_form) เมื่อเป็นประโยชน์ต่อผู้ถาม`;

const GEMINI_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "scroll_to_section",
        description: "เลื่อนหน้าเว็บไปยัง section ที่เกี่ยวข้อง",
        parameters: {
          type: "OBJECT",
          properties: {
            target: {
              type: "STRING",
              enum: ["home", "about", "skills", "projects"],
            },
          },
          required: ["target"],
        },
      },
      {
        name: "filter_projects",
        description: "กรองโปรเจกต์ตามหมวดหมู่",
        parameters: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              enum: ["All", "AI & Chatbot", "Automation", "Web System"],
            },
          },
          required: ["category"],
        },
      },
      {
        name: "open_project_modal",
        description: "เปิด Modal รายละเอียดและ Architecture Flow ของโปรเจกต์",
        parameters: {
          type: "OBJECT",
          properties: {
            projectId: { type: "NUMBER" },
          },
          required: ["projectId"],
        },
      },
      {
        name: "open_lead_form",
        description: "เปิดฟอร์มสำหรับ HR กรอกข้อมูลติดต่อหรือนัดสัมภาษณ์",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
    ],
  },
];

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  bucket.count += 1;
  return true;
}

function mapToolCallsToActions(parts: GeminiPart[]): AgentAction[] {
  const actions: AgentAction[] = [];

  for (const part of parts) {
    const call = part.functionCall;
    if (!call?.name) continue;
    const args = call.args ?? {};

    if (call.name === "scroll_to_section" && typeof args.target === "string") {
      actions.push({
        type: "scroll",
        label: `ไปยังส่วน ${args.target.toUpperCase()}`,
        target: args.target as SectionId,
      });
    } else if (call.name === "filter_projects" && typeof args.category === "string") {
      actions.push({
        type: "filter",
        label: `กรองหมวด ${args.category}`,
        category: args.category as ProjectCategory,
      });
    } else if (call.name === "open_project_modal" && typeof args.projectId === "number") {
      actions.push({
        type: "openProject",
        label: "เปิดดู Architecture Flow",
        projectId: args.projectId,
      });
    } else if (call.name === "open_lead_form") {
      actions.push({
        type: "openLeadForm",
        label: "เปิดฟอร์มติดต่อกลับ",
      });
    }
  }

  return actions;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const env =
    (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process
      ?.env ?? {};
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: { message?: string; history?: IncomingMessage[] };
  try {
    body = (await req.json()) as { message?: string; history?: IncomingMessage[] };
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const message = (body.message ?? "").trim();
  if (!message) {
    return new Response(JSON.stringify({ error: "Message is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const model = env.GEMINI_MODEL || "gemini-2.5-flash";
  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];

  const contents = [
    ...history.map((item) => ({
      role: item.role === "bot" ? "model" : "user",
      parts: [{ text: item.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const geminiRes = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      tools: GEMINI_TOOLS,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    }),
  });

  if (!geminiRes.ok) {
    return new Response(JSON.stringify({ error: "Upstream Gemini API error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await geminiRes.json()) as GeminiResponse;
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const replyText = parts
    .map((p) => p.text ?? "")
    .join("")
    .trim();
  const actions = mapToolCallsToActions(parts);

  const fallbackReply =
    replyText ||
    (actions.length > 0
      ? "ได้เลยครับ กดปุ่ม Action ด้านล่างเพื่อดูรายละเอียดที่ต้องการได้เลยครับ!"
      : "สามารถสอบถามเรื่องทักษะหรือโปรเจกต์ของ Pattle เพิ่มเติมได้เลยครับ");

  return new Response(
    JSON.stringify({
      reply: fallbackReply,
      actions,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
