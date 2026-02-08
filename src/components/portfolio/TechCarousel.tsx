import { useState } from "react";

import {
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGitAlt, FaLinux, FaSass
} from "react-icons/fa";
import {
  SiTypescript, SiNextdotjs, SiGo, SiCplusplus, SiRust, SiPostgresql,
  SiMongodb, SiRedis, SiGooglecloud, SiFirebase, SiTailwindcss, SiGraphql
} from "react-icons/si";

interface TechItem {
  name: string;
  color: string;
  icon: JSX.Element;
}

const techStack: TechItem[] = [
  { name: "React", color: "#61DAFB", icon: <FaReact /> },
  { name: "TypeScript", color: "#3178C6", icon: <SiTypescript /> },
  { name: "Next.js", color: "#000000", icon: <SiNextdotjs /> },
  { name: "Node.js", color: "#339933", icon: <FaNodeJs /> },
  { name: "Python", color: "#3776AB", icon: <FaPython /> },
  { name: "Go", color: "#00ADD8", icon: <SiGo /> },
  { name: "C++", color: "#00599C", icon: <SiCplusplus /> },
  { name: "Rust", color: "#DEA584", icon: <SiRust /> },
  { name: "Java", color: "#007396", icon: <FaJava /> },
  { name: "PostgreSQL", color: "#336791", icon: <SiPostgresql /> },
  { name: "MongoDB", color: "#47A248", icon: <SiMongodb /> },
  { name: "Redis", color: "#DC382D", icon: <SiRedis /> },
  { name: "Docker", color: "#2496ED", icon: <FaDocker /> },
  { name: "AWS", color: "#FF9900", icon: <FaAws /> },
  { name: "Google Cloud", color: "#4285F4", icon: <SiGooglecloud /> },
  { name: "Firebase", color: "#FFCA28", icon: <SiFirebase /> },
  { name: "Git", color: "#F05032", icon: <FaGitAlt /> },
  { name: "Linux", color: "#FCC624", icon: <FaLinux /> },
  { name: "Tailwind", color: "#06B6D4", icon: <SiTailwindcss /> },
  { name: "GraphQL", color: "#E10098", icon: <SiGraphql /> },
];

const TechCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full overflow-hidden fade-edges group">
      {/* Inline styles for the double-track marquee */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-track {
          display: flex;
          min-width: 100%; /* Ensure it fills at least the screen */
          width: max-content; /* Allow it to grow if items overflow */
          flex-shrink: 0;
          animation: marquee-scroll 20s linear infinite;
        }
      `}</style>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Marquee Container with two identical tracks */}
      <div className="flex select-none leading-none">
        {/* Track 1 */}
        <div className="marquee-track flex gap-4 px-2">
          {techStack.map((tech, index) => (
            <TechCard
              key={`t1-${tech.name}`}
              tech={tech}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        {/* Track 2 (Duplicate) */}
        <div className="marquee-track flex gap-4 px-2">
          {techStack.map((tech, index) => (
            <TechCard
              key={`t2-${tech.name}`}
              tech={tech}
              index={index}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Extracted Card Component for cleaner code
const TechCard = ({ tech, index, hoveredIndex, setHoveredIndex }: {
  tech: TechItem;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) => (
  <div
    className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-xl md:text-2xl font-bold cursor-pointer transition-all duration-300 bg-glass border border-white/5 hover:border-white/20"
    style={{
      backgroundColor: `${tech.color}15`,
      borderColor: `${tech.color}30`,
      transform:
        hoveredIndex === index
          ? `scale(1.1) rotate(${index % 2 === 0 ? -2 : 2}deg)`
          : "scale(1)",
      boxShadow:
        hoveredIndex === index
          ? `0 8px 24px ${tech.color}30`
          : "none",
    }}
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}
    title={tech.name}
  >
    {tech.icon}
  </div>
);

export default TechCarousel;
