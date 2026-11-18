import type { ProjectData } from "../types";

export const projectsData: ProjectData[] = [
  {
    id: 201,
    image: "/sub-agent-ai.jpg",
    title: "Web Team v3 — Multi-Agent AI Orchestrator",
    category: "AI & Chatbot",
    featured: true,
    preview:
      "ระบบ Multi-Agent Subagent 16 ตัวสำหรับสร้างเว็บอัตโนมัติ (Antigravity & Claude Code) พร้อม Impeccable Design Guardrails",
    fullDescription:
      "เฟรมเวิร์ก Multi-Agent Orchestrator ที่ออกแบบ Workflow ตั้งแต่ G0 Intake จนถึง G9 Release ด้วย Subagent 16 บทบาท (Analyst, Architect, UX/UI, Frontend, Backend, QA, Security) เขียนจากต้นฉบับเดียวแล้ว build แยกให้ทั้ง Antigravity (.agents/) และ Claude Code (.claude/) พร้อมสคริปต์ตรวจ Gate, Guardrails ป้องกัน AI Slop และระบบ Audit เทียบ Git",
    techStack: ["Multi-Agent AI", "Python", "Prompt Engineering", "Antigravity", "Claude Code", "Impeccable"],
    architectureFlow: [
      {
        step: "01",
        label: "build.py Generator",
        detail: "คอมไพล์ Agent 16 ตัวจาก src/ ไปยัง .agents/ และ .claude/",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Orchestrator & Gates",
        detail: "คุมลำดับ G0–G9 พร้อมสคริปต์ webteam.py ตรวจ Gate",
        nodeType: "ai",
      },
      {
        step: "03",
        label: "Hook & Ownership Guard",
        detail: "บล็อกการแก้ไขข้าม Lane และตรวจ Git Audit ทุก Gate",
        nodeType: "logic",
      },
      {
        step: "04",
        label: "Verified Web Delivery",
        detail: "ส่งมอบโค้ดพร้อม Impeccable Design & Test Handoff",
        nodeType: "output",
      },
    ],
    githubUrl: "https://github.com/PCPzen/sub_agent_skillwebsite",
  },
  {
    id: 202,
    image: "/security-sentinel.png",
    title: "Security Sentinel Ultra v8.0 (Windows EDR)",
    category: "Automation",
    featured: true,
    preview:
      "เครื่องมือตรวจจับและป้องกันภัยคุกคามระดับ User-Mode (Ring 3 EDR) บน Windows 10/11 ด้วย PowerShell + System Tray & Dashboard",
    fullDescription:
      "ระบบ Security Automation & Endpoint Telemetry สำหรับ Windows 10/11 ที่ทำงานแบบ Zero-Dependency: มีโปรเซสคู่ Watchdog + Guardian, ระบบล็อก Trust Anchor ด้วย SHA-256 & Authenticode, เก็บ Secret ด้วย DPAPI/HKLM, บันทึก Log แบบ HMAC-SHA256 Chain ป้องกันการแก้ไขย้อนหลัง พร้อม GUI Dashboard (WPF) และ System Tray Agent ผ่านชุดทดสอบ CI บน GitHub Actions",
    techStack: ["PowerShell", "Windows EDR", "HMAC-SHA256", "DPAPI", "WPF/XAML", "GitHub Actions"],
    architectureFlow: [
      {
        step: "01",
        label: "ETW & Event 4688",
        detail: "ดักจับการสร้าง Process และ CommandLine แบบ Real-time",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Watchdog & Guardian",
        detail: "ตรวจสอบ SHA-256 Trust Anchor และ Safe-Mode Parent Path",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "HMAC Log & Event Viewer",
        detail: "บันทึกเหตุการณ์พร้อมลูกโซ่ HMAC-SHA256 ป้องกันการปลอมแปลง",
        nodeType: "data",
      },
      {
        step: "04",
        label: "WPF Dashboard & Tray",
        detail: "แสดงสถานะความปลอดภัยและควบคุมการพัก/เปิด Shield ผ่าน UAC",
        nodeType: "output",
      },
    ],
    githubUrl: "https://github.com/PCPzen/git_security",
  },
  {
    id: 203,
    image: "/webapphotel.png",
    title: "Dormitory Management System (WebAppHotel)",
    category: "Web System",
    featured: true,
    preview:
      "ระบบบริหารจัดการหอพักเต็มรูปแบบ (9-Step Roadmap) พัฒนาด้วย Next.js 16 + Prisma + Supabase PostgreSQL พร้อม RBAC",
    fullDescription:
      "เว็บแอปพลิเคชันบริหารจัดการหอพักครบวงจรทั้งฝั่งผู้ดูแลระบบ (Admin/Staff) และผู้เช่า (Tenant Portal): ครอบคลุมการจัดการห้องพัก ทะเบียนผู้เช่า (PDPA Masking) สัญญาเช่า จดมิเตอร์น้ำ-ไฟ ออกใบแจ้งหนี้ ตรวจสลิปและออกใบเสร็จ แจ้งซ่อม และแดชบอร์ดสรุปยอด พัฒนาด้วย Next.js 16 (App Router), Tailwind CSS v4, Prisma ORM และ Supabase Auth/PostgreSQL",
    techStack: ["Next.js 16", "TypeScript", "Prisma", "Supabase", "Tailwind CSS v4", "PostgreSQL"],
    architectureFlow: [
      {
        step: "01",
        label: "Supabase Auth & RBAC",
        detail: "แยกสิทธิ์ Admin/Staff และ Tenant Portal (/me)",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Business Rules Engine",
        detail: "ตรวจบัตร ปชช. Mod-11, ล็อกสัญญาซ้ำ, คำนวณบิลค่าน้ำ-ไฟ",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "Prisma + PostgreSQL",
        detail: "จัดเก็บข้อมูลห้องพัก มิเตอร์ ใบแจ้งหนี้ และใบเสร็จ RCP",
        nodeType: "data",
      },
      {
        step: "04",
        label: "Admin & Tenant Dashboard",
        detail: "สรุปรายรับ อัตราการเข้าพัก และติดตามสถานะงานซ่อม",
        nodeType: "output",
      },
    ],
    githubUrl: "https://github.com/PCPzen/webapphotel",
  },
  {
    id: 1,
    image: "/project1.png",
    title: "ระบบจองเสื้อโครงการ 3 ภาษา รอบโควตา 68",
    category: "Web System",
    preview: "ผลงานฝึกงาน ใช้ PHP + MySQL บันทึกข้อมูลการจองเสื้อ ใช้งานจริงที่หน้างาน",
    fullDescription:
      "ผลงานชิ้นแรกจากทีมฝึกงานแผนกเทคนิคคอมพิวเตอร์ วิทยาลัยเทคนิคแพร่ ที่ได้นำไปใช้งานจริงหน้างาน พัฒนาด้วย HTML5, CSS3, Bootstrap, PHP และ MySQL บนสภาพแวดล้อม XAMPP พร้อมระบบบันทึกและตรวจสอบรายการจองลงฐานข้อมูล",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    architectureFlow: [
      {
        step: "01",
        label: "Student Order Form",
        detail: "นักศึกษาเลือกไซส์และกรอกข้อมูลการจอง",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "PHP Validation",
        detail: "ตรวจสอบข้อมูลและคำนวณยอดสั่งจอง",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "MySQL Database",
        detail: "บันทึกข้อมูลลงตารางการจองผ่าน XAMPP",
        nodeType: "data",
      },
      {
        step: "04",
        label: "Admin Summary",
        detail: "สรุปยอดแต่ละไซส์สำหรับทีมงานหน้างาน",
        nodeType: "output",
      },
    ],
    link: "http://supawit.ctnphrae.com/Shirtsystem/index.php",
  },
  {
    id: 2,
    image: "/project2.png",
    title: "LMS ระบบจัดการเรียนการสอนออนไลน์",
    category: "Web System",
    preview: "ระบบจัดการการเรียนการสอนออนไลน์ พร้อมจัดการบทเรียนและฐานข้อมูลผู้เรียน",
    fullDescription:
      "ระบบ Learning Management System (LMS) ที่พัฒนาโดยทีมฝึกงานแผนกเทคนิคคอมพิวเตอร์ วิทยาลัยเทคนิคแพร่ ใช้ Bootstrap, HTML5, CSS3, PHP และ MySQL เพื่อรองรับการเข้าถึงบทเรียนและจัดการข้อมูลการเรียนการสอนออนไลน์",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    architectureFlow: [
      {
        step: "01",
        label: "Auth & Role Check",
        detail: "แยกสิทธิ์ผู้สอนและผู้เรียนผ่าน Session",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Course & Material API",
        detail: "จัดการบทเรียนและเอกสารประกอบการสอน",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "MySQL Persistence",
        detail: "จัดเก็บข้อมูลรายวิชาและผู้เรียน",
        nodeType: "data",
      },
      {
        step: "04",
        label: "Learning Portal",
        detail: "หน้าเว็บสำหรับเข้าเรียนและติดตามเนื้อหา",
        nodeType: "output",
      },
    ],
    link: "http://bowornwit.ctnphrae.com/onlinecourse2/index.php",
  },
  {
    id: 3,
    image: "/project3.png",
    title: "PROGRESS CHART SYSTEM ONLINE",
    category: "Web System",
    preview: "ระบบรายงานผลความก้าวหน้าการปฏิบัติงานนักเรียน-นักศึกษา (Frontend Lead)",
    fullDescription:
      "ระบบรายงานผลความก้าวหน้าการปฏิบัติงานนักเรียน-นักศึกษา โดยในโปรเจกต์นี้ผมรับผิดชอบการออกแบบ Frontend ทั้งหมดด้วย Bootstrap, HTML5 และ CSS3 เชื่อมต่อกับระบบหลังบ้าน PHP และ MySQL เพื่อแสดงผลความคืบหน้าอย่างชัดเจน",
    techStack: ["Bootstrap", "HTML5", "CSS3", "PHP", "MySQL"],
    architectureFlow: [
      {
        step: "01",
        label: "Task Submission",
        detail: "นักศึกษาบันทึกความคืบหน้าของงาน",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Progress Calculation",
        detail: "คำนวณเปอร์เซ็นต์ความสำเร็จตามเกณฑ์",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "SQL Record",
        detail: "เก็บประวัติการประเมินในฐานข้อมูล",
        nodeType: "data",
      },
      {
        step: "04",
        label: "Visual Progress UI",
        detail: "แสดงกราฟและตารางความก้าวหน้าแบบอ่านง่าย",
        nodeType: "output",
      },
    ],
    link: "https://progresschartsystemonline.wuaze.com/PROC-1/?i=2",
  },
  {
    id: 4,
    image: "/project5.png",
    title: "คลิปวิดีโอโปรโมทหลักสูตรแผนการเรียน",
    category: "Web System",
    preview: "งาน Media Production & Visual Storytelling ของทีม CTN แผนกเทคนิคคอมพิวเตอร์",
    fullDescription:
      "คลิปวิดีโอประชาสัมพันธ์หลักสูตรจัดทำโดยทีม CTN แผนกเทคนิคคอมพิวเตอร์ วิทยาลัยเทคนิคแพร่ โดยผมรับหน้าที่ตากล้องและร่วมออกแบบลำดับการเล่าเรื่อง (Storyboarding) เพื่อสื่อสารจุดเด่นของแผนกให้น่าสนใจ",
    techStack: ["Canva Pro", "CapCut Pro", "Premiere Pro", "Storyboarding"],
    architectureFlow: [
      {
        step: "01",
        label: "Script & Storyboard",
        detail: "วางลำดับเรื่องและมุมกล้องสำหรับโปรโมทหลักสูตร",
        nodeType: "trigger",
      },
      {
        step: "02",
        label: "Production Shoot",
        detail: "ถ่ายทำจริงร่วมกับทีม CTN",
        nodeType: "logic",
      },
      {
        step: "03",
        label: "Post-Production",
        detail: "ตัดต่อ ใส่กราฟิก และปรับโทนสี",
        nodeType: "data",
      },
      {
        step: "04",
        label: "Social Release",
        detail: "เผยแพร่ผ่านเพจแผนกเทคนิคคอมพิวเตอร์",
        nodeType: "output",
      },
    ],
    link: "https://www.facebook.com/ctnphrae10/videos/1596655771253751",
  },
];
