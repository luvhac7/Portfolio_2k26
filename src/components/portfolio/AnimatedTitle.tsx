import { useState, useEffect, memo } from "react";

interface AnimatedTitleProps {
  onAnimationComplete?: () => void;
}

const roles = [
  "AI/ML Engineer",
  "Competitive Programmer",
  "Full Stack Developer",
  "Problem Solver",
  "Backend Engineer"
];

// Helper to generate random dust trajectory
const getRandomStyle = (index: number) => {
  // Random X between -100px and 100px
  const x = Math.floor(Math.random() * 200 - 100) + "px";
  // Random Y between -100px and -20px (mostly up)
  const y = Math.floor(Math.random() * 100 - 150) + "px";
  // Random rotation between -90 and 90 deg
  const r = Math.floor(Math.random() * 180 - 90) + "deg";
  // Random delay for a staggered effect
  const delay = (Math.random() * 0.1).toFixed(2) + "s";

  return {
    "--x": x,
    "--y": y,
    "--r": r,
    animationDelay: delay,
  } as React.CSSProperties;
};

const SplitText = ({ text, type }: { text: string; type: "in" | "out" }) => {
  return (
    <span className={type === "out" ? "animate-dust-out" : "animate-dust-in"}>
      {text.split("").map((char, i) => (
        <span
          key={`${i}-${char}`}
          className="dust-char inline-block whitespace-pre"
          style={getRandomStyle(i)}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const AnimatedTitle = ({ onAnimationComplete }: AnimatedTitleProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Title fade in
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
      onAnimationComplete?.();
    }, 200);

    return () => clearTimeout(titleTimer);
  }, [onAnimationComplete]);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTransitioning(false);
      }, 1200);

    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="text-center mb-12 md:mb-16">
      <h1
        className={`font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight mb-4 transition-all duration-500 ease-out ${showTitle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
          }`}
      >
        Luv
      </h1>

      <div className="h-8 md:h-10 relative overflow-visible flex justify-center items-center">
        {/* Outgoing Role (Dust Effect) */}
        {isTransitioning && (
          <p className="absolute text-sm md:text-lg font-light tracking-[0.2em] uppercase text-muted-foreground">
            <SplitText text={roles[roleIndex]} type="out" />
          </p>
        )}

        {/* Incoming Role (Fade/Form Effect) */}
        {!isTransitioning && (
          <p className="absolute text-sm md:text-lg font-light tracking-[0.2em] uppercase text-muted-foreground">
            <SplitText text={roles[roleIndex]} type="in" />
          </p>
        )}
      </div>
    </header>
  );
};

export default AnimatedTitle;
