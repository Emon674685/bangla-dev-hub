import { ReactNode } from "react";

interface StepCardProps {
  step: number;
  title: string;
  children: ReactNode;
}

const StepCard = ({ step, title, children }: StepCardProps) => {
  return (
    <div className="bg-card rounded-xl p-3 sm:p-5 border border-border">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <span className="text-primary font-display text-xs sm:text-sm">Step {step}:</span>
        <h3 className="text-base sm:text-lg font-display font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default StepCard;
