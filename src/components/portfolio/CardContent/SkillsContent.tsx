const skillCategories = [
  {
    title: "Core Languages",
    skills: ["C++", "C", "Java", "Go", "JavaScript (React/Node.js)", "SQL"],
  },
  {
    title: "Cloud & Distributed Systems",
    skills: [
      "Microservices",
      "Docker",
      "CI/CD",
      "Google Cloud (Serverless)",
      "REST APIs",
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "OS Concurrency",
      "DBMS",
      "System Design",
    ],
  },
  {
    title: "AI/ML Technologies",
    skills: [
      "Vertex AI",
      "Zero-Knowledge Proofs",
      "Sentiment Analysis",
      "DeepFace",
    ],
  },
];

const SkillsContent = () => {
  return (
    <div className="space-y-6">
      {skillCategories.map((category) => (
        <div key={category.title}>
          <h3 className="text-lg font-semibold mb-3 text-peach">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-accent/10 hover:border-accent/30 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsContent;
