/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. เพิ่ม fontFamily เข้าไป
      fontFamily: {
        'orbitron': ['"Orbitron"', 'sans-serif'],
        'mono-tech': ['"Share Tech Mono"', 'monospace'],
      },

      // (นี่คือ keyframes เดิมที่เราเคยทำไว้ ไม่ต้องลบครับ)
      animation: {
        'border-spin': 'border-spin 7s linear infinite',
        'glitch': 'glitch 0.5s linear infinite',
        'noise': 'noise 0.5s linear infinite',
      },
      keyframes: {
        'border-spin': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'glitch': {
          '0%': { clipPath: 'inset(10% 0 80% 0)' },
          '20%': { clipPath: 'inset(90% 0 5% 0)' },
          '40%': { clipPath: 'inset(45% 0 45% 0)' },
          '60%': { clipPath: 'inset(15% 0 75% 0)' },
          '80%': { clipPath: 'inset(85% 0 10% 0)' },
          '100%': { clipPath: 'inset(50% 0 40% 0)' },
        },
        'noise': {
            '0%': { transform: 'translate(0, 0)' },
            '10%': { transform: 'translate(-5%, -5%)' },
            '20%': { transform: 'translate(-10%, 5%)' },
            '30%': { transform: 'translate(5%, -10%)' },
            '40%': { transform: 'translate(-5%, 15%)' },
            '50%': { transform: 'translate(-10%, 5%)' },
            '60%': { transform: 'translate(15%, 0)' },
            '70%': { transform: 'translate(0, 10%)' },
            '80%': { transform: 'translate(-15%, 0)' },
            '90%': { transform: 'translate(10%, 5%)' },
            '100%': { transform: 'translate(5%, 0)' },
        },
      },
    },
  },
  plugins: [],
};
