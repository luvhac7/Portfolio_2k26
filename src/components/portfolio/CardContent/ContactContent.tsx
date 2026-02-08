import { Mail, Phone, MapPin, Github, Linkedin, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactContentProps {
  links?: {
    github?: string;
    linkedin?: string;
    portfolio?: string;
    leetcode?: string;
    codechef?: string;
    codeforces?: string;
  };
}

const ContactContent = ({ links = {} }: ContactContentProps) => {
  const {
    github = "#",
    linkedin = "#",
    portfolio = "#",
    leetcode = "#",
    codechef = "#",
    codeforces = "#",
  } = links;

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-peach">
          Contact Information
        </h3>
        <div className="space-y-3">
          <a
            href="mailto:1si23ci022@sit.ac.in"
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Mail className="w-5 h-5 text-accent" />
            <span className="text-sm">1si23ci022@sit.ac.in</span>
          </a>
          <a
            href="tel:+919123194664"
            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5 text-accent" />
            <span className="text-sm">+91-9123194664</span>
          </a>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm">Tumakuru, Karnataka, India</span>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-peach">Social Links</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10"
            asChild
          >
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10"
            asChild
          >
            <a href={github} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10"
            asChild
          >
            <a href={portfolio} target="_blank" rel="noopener noreferrer">
              <Globe className="w-4 h-4" /> Portfolio
            </a>
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-2 bg-white/5 border-white/10 hover:bg-white/10"
            asChild
          >
            <a href={leetcode} target="_blank" rel="noopener noreferrer">
              <Code className="w-4 h-4" /> LeetCode
            </a>
          </Button>
        </div>
      </div>

      {/* Competitive Programming Stats */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-peach">
          Competitive Programming
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">1722</p>
            <p className="text-xs text-muted-foreground">LeetCode (Top 11%)</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">1764</p>
            <p className="text-xs text-muted-foreground">CodeChef (3⋆)</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-center">
            <p className="text-lg font-bold text-accent">Pupil</p>
            <p className="text-xs text-muted-foreground">Codeforces</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl text-center">
            <p className="text-2xl font-bold text-accent">1,400+</p>
            <p className="text-xs text-muted-foreground">Problems Solved</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-accent/10 rounded-xl text-center">
          <p className="text-2xl font-bold text-accent">1,300+</p>
          <p className="text-sm text-muted-foreground">
            GitHub Contributions (past year)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
