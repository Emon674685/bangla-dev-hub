import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Sparkle from "./Sparkle";

interface FramePreviewProps {
  template: string;
  photo: string | null;
  name: string;
  designation: string;
  wishingText: string;
}

export interface FramePreviewHandle {
  getCanvas: () => HTMLCanvasElement | null;
}

const FramePreview = forwardRef<FramePreviewHandle, FramePreviewProps>(
  ({ template, photo, name, designation, wishingText }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const getTemplateColors = () => {
      switch (template) {
        case "gold":
          return { border: "#D4A418", accent: "#F5C642", bg: "rgba(30, 41, 59, 0.95)", text: "#FFFFFF" };
        case "green":
          return { border: "#10B981", accent: "#34D399", bg: "rgba(20, 50, 40, 0.95)", text: "#FFFFFF" };
        case "purple":
          return { border: "#A855F7", accent: "#D946EF", bg: "rgba(40, 20, 60, 0.95)", text: "#FFFFFF" };
        case "royal-blue":
          return { border: "#60A5FA", accent: "#D4A418", bg: "rgba(30, 41, 70, 0.98)", text: "#F5C642" };
        case "premium-black":
          return { border: "#D4A418", accent: "#F5C642", bg: "rgba(15, 15, 20, 0.98)", text: "#F5C642" };
        case "party-pink":
          return { border: "#EC4899", accent: "#F472B6", bg: "rgba(80, 30, 60, 0.95)", text: "#FBBF24" };
        default:
          return { border: "#D4A418", accent: "#F5C642", bg: "rgba(30, 41, 59, 0.95)", text: "#FFFFFF" };
      }
    };

    const defaultWishing =
      "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!";

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const colors = getTemplateColors();
      const size = 600;
      canvas.width = size;
      canvas.height = size;

      // Background
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, size, size);

      // Border decoration
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, size - 40, size - 40);

      // Inner border
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ctx.strokeRect(35, 35, size - 70, size - 70);

      // Corner decorations
      const drawCornerStar = (x: number, y: number) => {
        ctx.fillStyle = colors.accent;
        ctx.font = "20px serif";
        ctx.fillText("✦", x, y);
      };

      drawCornerStar(40, 55);
      drawCornerStar(size - 55, 55);
      drawCornerStar(40, size - 40);
      drawCornerStar(size - 55, size - 40);

      // Happy New Year text
      ctx.fillStyle = colors.accent;
      ctx.font = "italic 28px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("HAPPY", size / 2, 90);

      ctx.font = "bold 42px 'Playfair Display', serif";
      ctx.fillText("NEW YEAR", size / 2, 135);

      // Photo circle
      const centerX = size / 2;
      const centerY = 280;
      const radius = 110;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 3;
      ctx.stroke();

      if (photo) {
        const img = new Image();
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.clip();
          
          // Calculate aspect ratio and draw
          const aspectRatio = img.width / img.height;
          let drawWidth = radius * 2;
          let drawHeight = radius * 2;
          
          if (aspectRatio > 1) {
            drawWidth = radius * 2 * aspectRatio;
          } else {
            drawHeight = radius * 2 / aspectRatio;
          }
          
          ctx.drawImage(
            img,
            centerX - drawWidth / 2,
            centerY - drawHeight / 2,
            drawWidth,
            drawHeight
          );
          ctx.restore();
          
          // Redraw rest after image loads
          drawRemainingContent();
        };
        img.src = photo;
      } else {
        ctx.fillStyle = "rgba(100, 116, 139, 0.3)";
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(148, 163, 184, 0.7)";
        ctx.font = "14px 'Inter', sans-serif";
        ctx.fillText("Your Photo", centerX, centerY + 5);
        
        drawRemainingContent();
      }

      function drawRemainingContent() {
        // Year
        ctx.fillStyle = colors.accent;
        ctx.font = "bold 48px 'Playfair Display', serif";
        ctx.textAlign = "center";
        ctx.fillText("2026", size / 2, 440);

        // Decorative stars around year
        ctx.font = "14px serif";
        ctx.fillText("✦", size / 2 - 80, 425);
        ctx.fillText("✦", size / 2 + 80, 425);
        ctx.fillText("✦", size / 2 - 60, 455);
        ctx.fillText("✦", size / 2 + 60, 455);

        // Wishing text
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.font = "11px 'Inter', sans-serif";
        const text = wishingText || defaultWishing;
        const maxWidth = size - 100;
        const words = text.split(" ");
        let line = "";
        let y = 480;
        const lineHeight = 14;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line.trim(), size / 2, y);
            line = words[i] + " ";
            y += lineHeight;
            if (y > 520) break;
          } else {
            line = testLine;
          }
        }
        if (y <= 520) {
          ctx.fillText(line.trim(), size / 2, y);
        }
      

        // Name and designation
        if (name || designation) {
          ctx.fillStyle = colors.accent;
          ctx.font = "bold 16px 'Inter', sans-serif";
          const displayText = [name, designation].filter(Boolean).join(" - ");
          ctx.fillText(displayText, size / 2, 550);
        }
// iHelpBD Logo (image)
const logo = new Image();
logo.src = "/ihelpbd-logo.png";

logo.onload = () => {
  const logoWidth = 120; // ছোট সাইজ
  const aspectRatio = logo.width / logo.height;
  const logoHeight = logoWidth / aspectRatio;

  ctx.drawImage(
    logo,
    size / 2 - logoWidth / 2-240, // center horizontally
    1,                      // vertical position
    logoWidth,
    logoHeight
  );
};

      
      }
    }, [template, photo, name, designation, wishingText]);

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
    }));

    return (
      <div className="relative float">
        {/* Sparkles around frame */}
        <Sparkle className="absolute -top-2 left-1/4 text-lg" delay={0} />
        <Sparkle className="absolute -top-2 right-1/4 text-lg" delay={1} />
        <Sparkle className="absolute top-1/4 -left-2 text-lg" delay={2} />
        <Sparkle className="absolute top-1/4 -right-2 text-lg" delay={3} />
        <Sparkle className="absolute bottom-1/4 -left-2 text-lg" delay={1} />
        <Sparkle className="absolute bottom-1/4 -right-2 text-lg" delay={0} />
        <Sparkle className="absolute -bottom-2 left-1/4 text-lg" delay={2} />
        <Sparkle className="absolute -bottom-2 right-1/4 text-lg" delay={3} />

        <canvas
          ref={canvasRef}
          className="w-full max-w-md rounded-lg shadow-2xl glow-gold"
        />
      </div>
    );
  }
);

FramePreview.displayName = "FramePreview";

export default FramePreview;
