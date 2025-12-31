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
  {
    id: "royal-blue",
    name: "Royal Blue",
    description: "Party celebration",
    gradient: "bg-gradient-to-br from-slate-700 to-blue-900",
    borderColor: "border-blue-400",
  },
  {
    id: "premium-black",
    name: "Premium Black",
    description: "Luxury gold & black",
    gradient: "bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900",
    borderColor: "border-amber-500",
  },
  {
    id: "party-pink",
    name: "Party Pink",
    description: "Vibrant coral style",
    gradient: "bg-gradient-to-br from-pink-500 via-purple-600 to-rose-500",
    borderColor: "border-pink-400",
  },
];

interface TemplateSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const TemplateSelector = ({ selected, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
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
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="p-1.5 sm:p-2 bg-secondary/50 text-center">
            <p className="text-xs font-medium text-foreground truncate">{template.name}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate hidden sm:block">{template.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
