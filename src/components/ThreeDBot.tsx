// src/components/ThreeDBot.tsx

import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { Environment, Sphere, Plane } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import type { SectionId } from "../types";
import TypewriterMessage from "./TypewriterMessage";

// --- Component ของตัว Bot ---
function BotModel({
  targetPosition,
  setBotPixelPos,
  setMode,
}: {
  targetPosition: THREE.Vector3;
  setBotPixelPos: (pos: { x: number; y: number }) => void;
  setMode: (mode: "guide" | "dragging") => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { camera, gl } = useThree();

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // เคลื่อนเข้าเป้าหมายลื่นๆ
    meshRef.current.position.lerp(targetPosition, 0.05);

    // หมุนช้าๆ
    meshRef.current.rotation.y += delta * 0.2;
    meshRef.current.rotation.x += delta * 0.1;

    // project เป็นพิกัด pixel บนจอ
    const ndc = meshRef.current.position.clone().project(camera);
    const rect = (gl.domElement as HTMLCanvasElement).getBoundingClientRect();
    const x = rect.left + (ndc.x * 0.5 + 0.5) * rect.width;
    const y = rect.top + (-ndc.y * 0.5 + 0.5) * rect.height;
    setBotPixelPos({ x, y });
  });

  const setCursor = (value: string) => {
    document.body.style.cursor = value;
  };

  return (
    <Sphere
      ref={meshRef}
      args={[0.5, 32, 32]}
      scale={0.6}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setMode("dragging");
        setCursor("grabbing");
      }}
      onPointerUp={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setMode("guide");
        setCursor("grab");
      }}
      onPointerEnter={() => setCursor("grab")}
      onPointerLeave={() => setCursor("auto")}
    >
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.5}
        wireframe
      />
    </Sphere>
  );
}

// --- Component จัดการฉาก ---
function SceneContent({
  mode,
  setMode,
  setBotPixelPos,
}: {
  mode: "guide" | "dragging";
  setMode: (mode: "guide" | "dragging") => void;
  setBotPixelPos: (pos: { x: number; y: number }) => void;
}) {
  const { viewport } = useThree();
  const mouse3DPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetPosition = new THREE.Vector3();

  if (mode === "dragging") {
    targetPosition.copy(mouse3DPos.current);
  } else {
    targetPosition.set(-viewport.width / 2.2, -0.5, 0);
  }

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 10, 5]} intensity={3} />
      <Environment preset="city" />

      <BotModel
        targetPosition={targetPosition}
        setBotPixelPos={setBotPixelPos}
        setMode={setMode}
      />

      {/* ระนาบสำหรับลาก (โปร่งใสแต่รับอีเวนต์ได้) */}
      <Plane
        args={[viewport.width * 2, viewport.height * 2]}
        position={[0, 0, 0]}
        onPointerMove={(e) => {
          if (mode === "dragging") {
            mouse3DPos.current.copy(e.point);
          }
        }}
        onPointerUp={() => {
          if (mode === "dragging") {
            setMode("guide");
            document.body.style.cursor = "grab";
          }
        }}
      >
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </Plane>
    </>
  );
}

// --- คลังคำพูด ---
const sectionMessages: Record<SectionId, string> = {
  home:
    "ยินดีต้อนรับสู่ Portfolio ของผม! (สามารถเปิดปิดฟังค์ชันบอทได้จากเมนูด้านบนหรือขีด3ขีด)",
  about: "ในส่วนนี้ผมจะเล่าให้ฟังเกี่ยวกับตัวตนของผม",
  skills: "นี่คือเทคโนโลยีและเครื่องมือที่ผมเชี่ยวชาญ",
  projects:
    "ชมผลงานที่ผมภูมิใจนำเสนอได้ที่นี่เลยครับ!(สามารถเปิดคลิกที่รูปProjectเพื่อดูรายละเอียดเพิ่มเติม)",
};

// --- Component หลัก ThreeDBot ---
const ThreeDBot = ({ currentSection }: { currentSection: SectionId }) => {
  const [enabled, setEnabled] = useState(true);

  // toggle จาก Navbar
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setEnabled(Boolean(ce.detail));
    };
    window.addEventListener("chatbot-toggle", handler as EventListener);
    return () =>
      window.removeEventListener("chatbot-toggle", handler as EventListener);
  }, []);

  const [message, setMessage] = useState<string | null>(null);
  const messageTimer = useRef<number | null>(null);
  const [mode, setMode] = useState<"guide" | "dragging">("guide");
  const [botPixelPos, setBotPixelPos] = useState({
    x: 150,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 360,
  });
  const [canvasInteractive, setCanvasInteractive] = useState(false);

  // เคลียร์เมื่อปิดบอท
  useEffect(() => {
    if (!enabled) {
      if (messageTimer.current) clearTimeout(messageTimer.current);
      setMessage(null);
      setCanvasInteractive(false);
      setMode("guide");
      document.body.style.cursor = "auto";
    }
  }, [enabled]);

  // อัปเดตข้อความเมื่อ section เปลี่ยนหรือโหมดเปลี่ยน
  useEffect(() => {
    if (!enabled) return;

    if (mode === "guide") {
      const newMessage = sectionMessages[currentSection];
      setMessage(newMessage);
      if (messageTimer.current) clearTimeout(messageTimer.current);
      messageTimer.current = window.setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage(null);
      if (messageTimer.current) clearTimeout(messageTimer.current);
    }
  }, [currentSection, mode, enabled]);

  // ปล่อย pointer เมื่อปล่อยเมาส์นอก canvas
  useEffect(() => {
    const onPointerUp = () => {
      if (canvasInteractive) {
        setCanvasInteractive(false);
        setMode("guide");
        document.body.style.cursor = "auto";
      }
    };
    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [canvasInteractive]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        canvasInteractive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ pointerEvents: canvasInteractive ? "auto" : "none" }}
      >
        <Suspense fallback={null}>
          <SceneContent
            mode={mode}
            setMode={setMode}
            setBotPixelPos={setBotPixelPos}
          />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {message && (
          <motion.div
            className="absolute max-w-xs p-4 
                       bg-sky-900/50 backdrop-blur-md 
                       border border-sky-400 rounded-lg 
                       shadow-2xl shadow-sky-500/20 
                       font-mono-tech text-slate-100
                       pointer-events-none"
            style={{ left: botPixelPos.x + 20, top: botPixelPos.y - 120 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <TypewriterMessage text={message} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hitbox จับลาก/คลิก */}
      <div
        className="absolute"
        style={{
          left: botPixelPos.x - 28,
          top: botPixelPos.y - 28,
          width: 56,
          height: 56,
          zIndex: 60,
          pointerEvents: "auto",
          cursor: canvasInteractive ? "grabbing" : "grab",
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setCanvasInteractive(true);
          setMode("dragging");
          document.body.style.cursor = "grabbing";
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!canvasInteractive) {
            setMode("guide");
            const text = sectionMessages[currentSection];
            setMessage(text);
            if (messageTimer.current) clearTimeout(messageTimer.current);
            messageTimer.current = window.setTimeout(() => setMessage(null), 3000);
          }
        }}
      >
        {canvasInteractive ? (
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#06b6d4" }} />
        ) : (
          <div style={{ width: 0, height: 0 }} />
        )}
      </div>
    </div>
  );
};

export default ThreeDBot;
