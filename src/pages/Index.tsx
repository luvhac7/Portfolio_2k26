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
import EyeTracker from "@/components/portfolio/EyeTracker";
import ContributionGraphBackground from "@/components/portfolio/ContributionGraphBackground";

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
    <div className="min-h-screen text-foreground overflow-x-hidden relative">
      {/* Background Animation - z-0 */}
      <ContributionGraphBackground />

      {/* Grain texture overlay */}
      <div className="grain-overlay z-[9998]" aria-hidden="true" />

      {/* Vignette effect */}
      <div className="vignette z-[9997]" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Main content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-64">
        {/* Animated title */}
        <AnimatedTitle />

        {/* Cards section */}
        <section
          className="relative pb-12 px-4 md:px-0"
          aria-label="Portfolio sections"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {/* About Card */}
            <PortfolioCard
              icon={User}
              title="About"
              description="B.E. in CSE (AI/ML)"
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
              modalContent={<ContactContent links={{
                linkedin: "https://www.linkedin.com/in/luv-653792216/",
                github: "https://github.com/luvhac7",
                leetcode: "https://leetcode.com/u/LUV_-/",
                codechef: "https://www.codechef.com/users/rag_plant_53",
                codeforces: "https://codeforces.com/profile/Luv_1809"
              }} />}
              modalTitle="Get in Touch"
            />
          </div>
        </section>
      </main>

      {/* Decorative elements */}
      <DecorativeElements isVisible={decorationsVisible} />

      {/* Chat interface */}
      <ChatInterface />

      {/* Experimental Eyeball Tracker */}
      <EyeTracker />
    </div>
  );
};

export default Index;
