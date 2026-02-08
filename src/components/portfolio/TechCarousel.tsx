import { useState } from "react";

interface TechItem {
  name: string;
  color: string;
  icon: string;
}

const techStack: TechItem[] = [
  { name: "React", color: "#61DAFB", icon: "⚛️" },
  { name: "TypeScript", color: "#3178C6", icon: "TS" },
  { name: "Cardano", color: "#0033AD", icon: "₳" },
  { name: "Firebase", color: "#FFCA28", icon: "🔥" },
  { name: "Docker", color: "#2496ED", icon: "🐳" },
  { name: "Google Cloud", color: "#4285F4", icon: "☁️" },
  { name: "Node.js", color: "#339933", icon: "⬢" },
  { name: "Next.js", color: "#000000", icon: "▲" },
  { name: "Tailwind", color: "#06B6D4", icon: "🌊" },
  { name: "Redis", color: "#DC382D", icon: "◆" },
];

const TechCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrollable container */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-2 fade-edges">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: `${tech.color}20`,
              border: `2px solid ${tech.color}40`,
              transform:
                hoveredIndex === index
                  ? `scale(1.1) rotate(${index % 2 === 0 ? -2 : 2}deg)`
                  : "scale(1)",
              boxShadow:
                hoveredIndex === index
                  ? `0 8px 24px ${tech.color}40`
                  : "none",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            title={tech.name}
          >
            {tech.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;
