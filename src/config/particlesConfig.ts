// src/config/particlesConfig.ts
import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  background: {
    color: { value: "transparent" },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "bounce" },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true, // ← ตัด area/value_area ออก ให้ใช้ค่าเริ่มต้นของ lib
      },
      value: 60,
    },
    opacity: { value: 0.2 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
};
