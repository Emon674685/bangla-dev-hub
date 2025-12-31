import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Sparkle from "@/components/Sparkle";
import StepCard from "@/components/StepCard";
import TemplateSelector from "@/components/TemplateSelector";
import PhotoUploader from "@/components/PhotoUploader";
import PersonalizeForm from "@/components/PersonalizeForm";
import FramePreview, { FramePreviewHandle } from "@/components/FramePreview";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [template, setTemplate] = useState("gold");
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [wishingText, setWishingText] = useState("");
  const frameRef = useRef<FramePreviewHandle>(null);

  const handlePhotoUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDownload = useCallback(() => {
    const canvas = frameRef.current?.getCanvas();
    if (!canvas) {
      toast.error("Please upload a photo first");
      return;
    }

    // Wait a bit for canvas to fully render
    setTimeout(() => {
      const link = document.createElement("a");
      link.download = `ihelpbd-newyear-2026-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success("Frame downloaded successfully!");
    }, 100);
  }, []);

  const handleReset = useCallback(() => {
    setTemplate("gold");
    setPhoto(null);
    setName("");
    setDesignation("");
    setWishingText("");
    toast.info("Frame reset to default");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-4 sm:gap-8 items-start">
          
          {/* Left Side - Preview Section */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-4">
            <div className="relative p-4 sm:p-6 rounded-2xl bg-card/50 border border-border">
              {/* Sparkles */}
              <Sparkle className="absolute top-2 left-4 text-lg" delay={0} />
              <Sparkle className="absolute top-2 right-4 text-lg" delay={2} />
              <Sparkle className="absolute bottom-1/3 left-2 text-base" delay={1} />
              <Sparkle className="absolute bottom-1/3 right-2 text-base" delay={3} />
              
              <FramePreview
                ref={frameRef}
                template={template}
                photo={photo}
                name={name}
                designation={designation}
                wishingText={wishingText}
              />

              {/* Quote section below preview */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-secondary/30 rounded-xl border-l-4 border-primary">
                <div className="text-primary text-xl sm:text-2xl mb-2">"</div>
                <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                  {wishingText || "Wishing you a New Year filled with success, prosperity, and new opportunities. May 2026 be a year of great achievements for all of us. Happy New Year!"}
                </p>
                <div className="text-primary text-xl sm:text-2xl text-right">"</div>
                {(name || designation) && (
                  <p className="text-xs sm:text-sm text-primary font-medium mt-2">
                    – {[name, designation].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Editor Section */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-5">
            {/* Title */}
            <div className="text-center lg:text-left relative mb-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-gradient-gold mb-1 sm:mb-2">
                New Year Frame Editor
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Create your personalized New Year 2026 greeting
              </p>
            </div>

            <StepCard step={1} title="Choose Template">
              <TemplateSelector selected={template} onSelect={setTemplate} />
            </StepCard>

            <StepCard step={2} title="Upload Photo">
              <PhotoUploader onUpload={handlePhotoUpload} preview={photo} />
            </StepCard>

            <StepCard step={3} title="Personalize">
              <PersonalizeForm
                name={name}
                designation={designation}
                wishingText={wishingText}
                onNameChange={setName}
                onDesignationChange={setDesignation}
                onWishingTextChange={setWishingText}
              />
            </StepCard>

            <StepCard step={4} title="Download Your Frame">
              {!photo && (
                <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4">
                  Upload a photo first to create your personalized frame.
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 sm:h-11"
                  disabled={!photo}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Frame
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-muted hover:bg-secondary h-10 sm:h-11"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            </StepCard>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center border-t border-border mt-8 sm:mt-12">
        <p className="text-muted-foreground text-xs sm:text-sm">
          © 2026 iHelpBD - Software for the Next Generation
        </p>
      </footer>
    </div>
  );
};

export default Index;
