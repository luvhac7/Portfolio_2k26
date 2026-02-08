import { useState, useEffect } from "react";
import { User, Briefcase, Folder, Send } from "lucide-react";
import CustomCursor from "@/components/portfolio/CustomCursor";
import AnimatedTitle from "@/components/portfolio/AnimatedTitle";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import TechCarousel from "@/components/portfolio/TechCarousel";
import DecorativeElements from "@/components/portfolio/DecorativeElements";
import ChatInterface from "@/components/portfolio/ChatInterface";
import AboutContent from "@/components/portfolio/CardContent/AboutContent";
import SkillsContent from "@/components/portfolio/CardContent/SkillsContent";
import ProjectsContent from "@/components/portfolio/CardContent/ProjectsContent";
import ContactContent from "@/components/portfolio/CardContent/ContactContent";

const Index = () => {
  const [cardsVisible, setCardsVisible] = useState(false);
  const [decorationsVisible, setDecorationsVisible] = useState(false);

  useEffect(() => {
    // Cards cascade (600-1200ms)
    const cardsTimer = setTimeout(() => {
      setCardsVisible(true);
    }, 600);

    // Decorative elements (1000-1400ms)
    const decorationsTimer = setTimeout(() => {
      setDecorationsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(cardsTimer);
      clearTimeout(decorationsTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Vignette effect */}
      <div className="vignette" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main className="relative px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-64">
        {/* Animated title */}
        <AnimatedTitle />

        {/* Cards section */}
        <section
          className="relative overflow-x-auto scrollbar-hide pb-4 -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20"
          aria-label="Portfolio sections"
        >
          <div className="flex gap-4 md:gap-6 min-w-max lg:min-w-0 lg:grid lg:grid-cols-4">
            {/* About Card */}
            <PortfolioCard
              icon={User}
              title="About"
              description="B.E. in CSE (AI/ML) | 8.65 CGPA"
              delay={0}
              isVisible={cardsVisible}
              modalContent={<AboutContent />}
              modalTitle="About Luv"
            />

            {/* Skills Card */}
            <PortfolioCard
              icon={Briefcase}
              title="Skills & Expertise"
              description="Full-Stack | Cloud | AI/ML"
              delay={150}
              isVisible={cardsVisible}
              modalContent={<SkillsContent />}
              modalTitle="Skills & Expertise"
            />

            {/* Projects Card */}
            <PortfolioCard
              icon={Folder}
              title="Projects"
              description="Nebula, SentiHeal & more"
              delay={300}
              isVisible={cardsVisible}
              modalContent={<ProjectsContent />}
              modalTitle="Featured Projects"
            >
              <TechCarousel />
            </PortfolioCard>

            {/* Contact Card */}
            <PortfolioCard
              icon={Send}
              title="Contact"
              description="Let's connect and build together"
              delay={450}
              isVisible={cardsVisible}
              modalContent={<ContactContent />}
              modalTitle="Get in Touch"
            />
          </div>
        </section>
      </main>

      {/* Decorative elements */}
      <DecorativeElements isVisible={decorationsVisible} />

      {/* Chat interface */}
      <ChatInterface />
    </div>
  );
};

export default Index;
