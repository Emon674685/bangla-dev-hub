import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  description: string;
  gradient: string;
  borderColor: string;
}

const templates: Template[] = [
  {
    id: "gold",
    name: "iHelpBD Gold",
    description: "Classic gold on navy",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    borderColor: "border-amber-400",
  },
  {
    id: "green",
    name: "Modern Green",
    description: "Fresh green geometric",
    gradient: "bg-gradient-to-br from-emerald-400 to-green-500",
    borderColor: "border-emerald-400",
  },
  {
    id: "purple",
    name: "Cosmic Purple",
    description: "Galaxy gradient style",
    gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    borderColor: "border-purple-400",
  },
];

interface TemplateSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onSelect(template.id)}
          className={cn(
            "relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-105",
            selected === template.id && "ring-2 ring-primary ring-offset-2 ring-offset-card"
          )}
        >
          <div className={cn("aspect-square", template.gradient)}>
            {selected === template.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="p-2 bg-secondary/50 text-center">
            <p className="text-sm font-medium text-foreground">{template.name}</p>
            <p className="text-xs text-muted-foreground">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
