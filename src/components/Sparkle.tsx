interface SparkleProps {
  className?: string;
  delay?: number;
}

const Sparkle = ({ className = "", delay = 0 }: SparkleProps) => {
  const delayClass = delay === 1 ? "sparkle-delay-1" : delay === 2 ? "sparkle-delay-2" : delay === 3 ? "sparkle-delay-3" : "";
  
  return (
    <span className={`sparkle ${delayClass} text-primary ${className}`}>
      ✦
    </span>
  );
};

export default Sparkle;
