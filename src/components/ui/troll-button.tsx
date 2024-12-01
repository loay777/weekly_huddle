import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { getRandomPosition } from "@/lib/random-position";

const ESCAPE_MESSAGES = [
  "Nice try! 😜",
  "Too slow! 🏃‍♂️",
  "Almost got me! 😅",
  "Keep trying! 🎯",
  "Last chance! 🎲",
  "Click me to try again! 🔄"
];

export function TrollButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("Try to click me! 😈");
  const [isEscaping, setIsEscaping] = useState(false);

  const teleportButton = () => {
    if (!buttonRef.current) return;
    const { width, height } = buttonRef.current.getBoundingClientRect();
    const newPosition = getRandomPosition(width, height);
    setPosition(newPosition);
    setMessage(ESCAPE_MESSAGES[Math.min(attempts, ESCAPE_MESSAGES.length - 1)]);
  };

  const handleReset = () => {
    setAttempts(0);
    setMessage("Try to click me! 😈");
    teleportButton();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || attempts >= 5) return;

      const button = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance between mouse and button
      const distanceX = mouseX - (button.left + button.width / 2);
      const distanceY = mouseY - (button.top + button.height / 2);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      // If mouse is within 150px of the button, teleport it
      if (distance < 150 && !isEscaping) {
        setIsEscaping(true);
        setAttempts(prev => prev + 1);
        teleportButton();
        
        // Reset escaping state after animation
        setTimeout(() => setIsEscaping(false), 300);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [attempts, isEscaping]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Button
        ref={buttonRef}
        className={cn(
          "absolute pointer-events-auto transition-all duration-300",
          isEscaping && "scale-110 rotate-12",
          attempts >= 5 && "hover:bg-primary/90"
        )}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onClick={attempts >= 5 ? handleReset : undefined}
      >
        {message}
      </Button>
    </div>
  );
}