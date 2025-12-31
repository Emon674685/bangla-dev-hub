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

      {/* Title Section */}
      <div className="text-center py-6 relative">
        <Sparkle className="absolute left-1/4 top-2 text-2xl" delay={0} />
        <Sparkle className="absolute right-1/4 top-2 text-2xl" delay={2} />
        <Sparkle className="absolute left-1/3 bottom-2 text-xl" delay={1} />
        <Sparkle className="absolute right-1/3 bottom-2 text-xl" delay={3} />
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-3">
          New Year Frame Editor
        </h1>
        <p className="text-muted-foreground text-lg">
          Create your personalized New Year 2026 greeting
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Preview Section */}
          <div className="flex justify-center lg:sticky lg:top-8">
            <FramePreview
              ref={frameRef}
              template={template}
              photo={photo}
              name={name}
              designation={designation}
              wishingText={wishingText}
            />
          </div>

          {/* Editor Section */}
          <div className="space-y-5">
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
                <p className="text-muted-foreground text-sm mb-4">
                  Upload a photo first to create your personalized frame.
                </p>
              )}
              <div className="flex gap-3">
                <Button
                  onClick={handleDownload}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!photo}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Frame
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-muted hover:bg-secondary"
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
      <footer className="py-8 text-center border-t border-border mt-12">
        <p className="text-muted-foreground text-sm">
          © 2026 iHelpBD - Software for the Next Generation
        </p>
      </footer>
    </div>
  );
};

export default Index;
