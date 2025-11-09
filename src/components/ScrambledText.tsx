// src/components/ScrambledText.tsx
import { useState, useRef } from "react";

const ScrambledText = ({ text }: { text: string }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ<>_\\/[]{}—=+*^?#";
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const scramble = () => {
    let iteration = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const resetText = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  return (
    <span onMouseEnter={scramble} onMouseLeave={resetText}>
      {displayText}
    </span>
  );
};

export default ScrambledText;
