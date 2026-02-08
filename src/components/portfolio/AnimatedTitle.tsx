import { useState, useEffect } from "react";

interface AnimatedTitleProps {
  onAnimationComplete?: () => void;
}

const AnimatedTitle = ({ onAnimationComplete }: AnimatedTitleProps) => {
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    // Title fade in (200-600ms)
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 200);

    // Subtitle fade in (400-600ms)
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 400);

    // Animation complete callback
    const completeTimer = setTimeout(() => {
      onAnimationComplete?.();
    }, 600);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <header className="text-center mb-12 md:mb-16">
      <h1
        className={`font-serif text-6xl md:text-8xl lg:text-9xl font-normal tracking-tight mb-4 transition-all duration-500 ease-out ${
          showTitle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"
        }`}
      >
        Luv
      </h1>
      <p
        className={`text-sm md:text-lg font-light tracking-[0.2em] uppercase text-muted-foreground transition-all duration-500 ease-out ${
          showSubtitle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        }`}
      >
        AI/ML Engineer
      </p>
    </header>
  );
};

export default AnimatedTitle;
