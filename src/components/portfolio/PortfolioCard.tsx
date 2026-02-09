import { ReactNode, useState } from "react";
import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PortfolioCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
  modalContent?: ReactNode;
  modalTitle?: string;
  delay?: number;
  isVisible?: boolean;
}

const PortfolioCard = ({
  icon: Icon,
  title,
  description,
  children,
  modalContent,
  modalTitle,
  delay = 0,
  isVisible = true,
}: PortfolioCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        className={`glass-card p-6 md:p-8 w-full flex flex-col h-full cursor-pointer group opacity-0 ${isVisible ? "animate-cascade" : ""
          }`}
        style={{
          animationDelay: `${delay}ms`,
          animationFillMode: "forwards",
        }}
        onClick={() => modalContent && setIsModalOpen(true)}
        role={modalContent ? "button" : undefined}
        tabIndex={modalContent ? 0 : undefined}
        onKeyDown={(e) => {
          if (e.key === "Enter" && modalContent) {
            setIsModalOpen(true);
          }
        }}
        aria-label={modalContent ? `Open ${title} details` : undefined}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-white/5 group-hover:bg-accent/10 transition-colors duration-300">
            <Icon
              className="w-6 h-6 md:w-8 md:h-8 icon-glow text-white/80 stroke-[1.5]"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-1">{title}</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </article>

      {modalContent && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">
                {modalTitle || title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Details about {title}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">{modalContent}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PortfolioCard;
