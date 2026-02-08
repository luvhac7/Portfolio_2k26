import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DecorativeElementsProps {
  isVisible?: boolean;
}

const DecorativeElements = ({ isVisible = true }: DecorativeElementsProps) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const dots = Array.from({ length: 8 });
  const bubbles = [
    { color: "chat-blue", delay: 0 },
    { color: "chat-green", delay: 0.5 },
    { color: "chat-blue", delay: 1 },
    { color: "chat-green", delay: 1.5 },
  ];

  useEffect(() => {
    // Cycle through active dots
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dots.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [dots.length]);

  if (isMobile) return null;

  return (
    <div
      className={`fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-8 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ animationDelay: "1000ms" }}
    >
      {/* Vertical dot progress indicator */}
      <div className="flex flex-col gap-5">
        {dots.map((_, index) => (
          <div
            key={index}
            className={`rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "w-4 h-4 bg-accent"
                : "w-3 h-3 bg-white/20"
            }`}
            style={{
              boxShadow:
                index === activeIndex
                  ? "0 0 12px hsl(var(--accent) / 0.6)"
                  : "none",
            }}
          />
        ))}
      </div>

      {/* Floating chat bubbles */}
      <div className="flex flex-col gap-4 mt-8">
        {bubbles.map((bubble, index) => (
          <div
            key={index}
            className={`w-16 h-6 rounded-full bg-${bubble.color} flex items-center justify-center gap-1 float-animation`}
            style={{
              animationDelay: `${bubble.delay}s`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecorativeElements;
