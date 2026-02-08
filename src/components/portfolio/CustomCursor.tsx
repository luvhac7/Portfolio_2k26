import { useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Add slight lag for smooth trailing effect
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
    });
    setIsVisible(true);

    // Check if hovering over clickable element
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      !!target.closest("button") ||
      !!target.closest("a") ||
      !!target.closest("[role='button']") ||
      window.getComputedStyle(target).cursor === "pointer";

    setIsPointer(isClickable);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    document.body.classList.add("custom-cursor");
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  if (isMobile) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-100"
      style={{
        left: position.x - 24,
        top: position.y - 24,
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isClicking ? 0.85 : isPointer ? 1.1 : 1})`,
      }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
        }}
      >
        {/* Hand pointer cursor */}
        <path
          d="M18 30V18.5C18 17.12 19.12 16 20.5 16C21.88 16 23 17.12 23 18.5V26"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M23 24.5C23 23.12 24.12 22 25.5 22C26.88 22 28 23.12 28 24.5V26"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M28 25.5C28 24.12 29.12 23 30.5 23C31.88 23 33 24.12 33 25.5V30C33 34.42 29.42 38 25 38H23C19.13 38 16 34.87 16 31V30"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M18 30C18 28.34 16.66 27 15 27C13.34 27 12 28.34 12 30V31"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {isPointer && (
          <circle
            cx="20.5"
            cy="12"
            r="3"
            fill="hsl(33, 100%, 50%)"
            opacity="0.8"
          />
        )}
      </svg>
    </div>
  );
};

export default CustomCursor;
