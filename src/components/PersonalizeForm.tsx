import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PersonalizeFormProps {
  name: string;
  designation: string;
  wishingText: string;
  onNameChange: (value: string) => void;
  onDesignationChange: (value: string) => void;
  onWishingTextChange: (value: string) => void;
}

const PersonalizeForm = ({
  name,
  designation,
  wishingText,
  onNameChange,
  onDesignationChange,
  onWishingTextChange,
}: PersonalizeFormProps) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="name" className="text-foreground text-xs sm:text-sm">
            Your Name <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="bg-secondary/50 border-muted h-9 sm:h-10 text-sm"
          />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="designation" className="text-foreground text-xs sm:text-sm">
            Designation <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="designation"
            placeholder="e.g. Student, Teacher"
            value={designation}
            onChange={(e) => onDesignationChange(e.target.value)}
            className="bg-secondary/50 border-muted h-9 sm:h-10 text-sm"
          />
        </div>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="wishing" className="text-foreground text-xs sm:text-sm">
          Custom Wishing Text <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="wishing"
          placeholder="Wishing you a New Year filled with success, prosperity, and new opportunities..."
          value={wishingText}
          onChange={(e) => onWishingTextChange(e.target.value)}
          className="bg-secondary/50 border-muted min-h-[60px] sm:min-h-[80px] text-sm"
        />
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          Leave empty to use the default wishing text
        </p>
      </div>
    </div>
  );
};

export default PersonalizeForm;
