const AboutContent = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-peach">Education</h3>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="font-medium">Siddaganga Institute of Technology</h4>
            <p className="text-sm text-muted-foreground">Tumakuru, India</p>
            <p className="text-sm mt-1">
              B.E. in Computer Science & Engineering (AI/ML Specialization)
            </p>
            <p className="text-sm text-peach font-medium mt-1">
              CGPA: 8.65 / 10.00
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Aug 2023 – Jun 2027
            </p>
          </div>

          <div className="p-4 bg-white/5 rounded-xl">
            <h4 className="font-medium">Kendriya Vidyalaya</h4>
            <p className="text-sm text-muted-foreground">Delhi, India</p>
            <p className="text-sm mt-1">Class XII: 86%</p>
            <p className="text-xs text-muted-foreground mt-1">2021-2022</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-peach">Bio</h3>
        <p className="text-muted-foreground leading-relaxed">
          Passionate AI/ML engineer with expertise in full-stack development,
          blockchain, and cloud systems. Top 0.16% hackathon finalist with
          1,300+ GitHub contributions. Specialized in building privacy-preserving
          applications and real-time AI systems.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-peach">Achievements</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-accent">🏆</span>
            Top 15 Finalist | Cardano Hackathon Asia (Top 0.16% of 9,000+ entries)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">🥇</span>
            1st Prize | Robocor Competition (300+ participants)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">☁️</span>
            Google Cloud Credits Award ($500)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent">👨‍🏫</span>
            DSA Mentorship: Guided 10+ students
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutContent;
