import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectProps {
  githubUrl?: string;
  demoUrl?: string;
}

const ProjectsContent = ({ githubUrl = "#", demoUrl = "#" }: ProjectProps) => {
  return (
    <div className="space-y-8">
      {/* Project 1: Nebula */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold">Nebula</h3>
            <p className="text-sm text-peach">
              Privacy-Preserving Life OS (dApp)
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
          <li>
            • Built a ZK-powered Life OS aggregating 3 distinct data streams
            (Health, Finance, Mood) with inference under 200 ms
          </li>
          <li>
            • Designed 4 autonomous agents processing 1,000+ simulation data
            points
          </li>
          <li>
            • Achieved 98% personalization accuracy with zero-knowledge privacy
          </li>
          <li>• Open-sourced ZK-client integration patterns</li>
          <li>
            • Primary reference architecture for Midnight Network developer
            ecosystem
          </li>
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {[
            "React",
            "TypeScript",
            "Cardano",
            "Masumi API",
            "DeepFace",
            "Midnight Network",
            "ZK Proofs",
          ].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
          <span>⚡ &lt;200ms inference</span>
          <span>🎯 98% accuracy</span>
          <span>📊 1,000+ data points</span>
        </div>
      </div>

      {/* Project 2: SentiHeal */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold">SentiHeal</h3>
            <p className="text-sm text-peach">AI Mental Wellness Companion</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
          <li>
            • Engineered real-time AI wellness app with 92% sentiment analysis
            accuracy
          </li>
          <li>
            • Processing voice inputs in &lt;300ms for minimal user friction
          </li>
          <li>
            • Integrated Vertex AI and Firebase for 100+ concurrent requests
          </li>
          <li>
            • Reduced backend query latency by 40% via optimized Firestore
            indexing
          </li>
          <li>• Implemented Cloud Run auto-scaling</li>
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Firebase",
            "Firestore",
            "Vertex AI",
            "Docker",
            "Google Cloud",
            "Redis",
          ].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
          <span>🎯 92% accuracy</span>
          <span>⚡ &lt;300ms processing</span>
          <span>📉 40% latency reduction</span>
        </div>
      </div>

      {/* Project 3: Shop Ease */}
      <div className="p-5 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold">Shop Ease</h3>
            <p className="text-sm text-peach">
              Full-Stack E-commerce Platform
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="https://github.com/luvhac7/shop-ease" target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="https://shop-ease-1.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View live demo">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        <ul className="text-sm text-muted-foreground space-y-1.5 mb-4">
          <li>
            • Scalable full-stack architecture inspired by Amazon/Flipkart
          </li>
          <li>
            • Secure authentication & authorization with admin dashboard
          </li>
          <li>
            • Complete e-commerce workflows: Product catalog, Cart, Orders
          </li>
          <li>
             • Responsive UI ensuring smooth user experience
          </li>
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {[
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Redux",
            "Stripe",
          ].map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsContent;
