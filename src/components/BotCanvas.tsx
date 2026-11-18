import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { BotState } from "../types";

interface BotCoreMeshProps {
  botState: BotState;
  reducedMotion: boolean;
}

const STATE_COLORS: Record<BotState, { core: string; ring: string; eye: string; speed: number }> = {
  idle: { core: "#00AEEF", ring: "#38BDF8", eye: "#E0F2FE", speed: 0.55 },
  thinking: { core: "#F59E0B", ring: "#8B5CF6", eye: "#FEF3C7", speed: 2.4 },
  speaking: { core: "#10B981", ring: "#38BDF8", eye: "#D1FAE5", speed: 1.35 },
};

function BotCoreMesh({ botState, reducedMotion }: BotCoreMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const palette = STATE_COLORS[botState];

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const speed = palette.speed;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.6 * speed;
      coreRef.current.rotation.x += delta * 0.25 * speed;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.9 * speed;
      ring1Ref.current.rotation.x = Math.PI / 3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.7 * speed;
      ring2Ref.current.rotation.y = Math.PI / 4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner AI Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshStandardMaterial
          color={palette.core}
          emissive={palette.core}
          emissiveIntensity={botState === "idle" ? 0.65 : 1.15}
          roughness={0.25}
          metalness={0.75}
        />
      </mesh>

      {/* Cyber Visor Eyes */}
      <mesh position={[-0.22, 0.12, 0.66]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={palette.eye}
          emissive={palette.eye}
          emissiveIntensity={1.6}
        />
      </mesh>
      <mesh position={[0.22, 0.12, 0.66]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={palette.eye}
          emissive={palette.eye}
          emissiveIntensity={1.6}
        />
      </mesh>

      {/* Orbital Gyroscope Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.1, 0.04, 16, 64]} />
        <meshStandardMaterial
          color={palette.ring}
          emissive={palette.ring}
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Gyroscope Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.3, 0.028, 16, 64]} />
        <meshStandardMaterial
          color={palette.core}
          emissive={palette.core}
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function BotCanvas({
  botState,
  reducedMotion,
}: {
  botState: BotState;
  reducedMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={1.1} />
      <pointLight position={[3, 3, 3]} intensity={2.2} color="#38BDF8" />
      <directionalLight position={[-3, -2, 2]} intensity={1.2} color="#00AEEF" />
      <BotCoreMesh botState={botState} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
