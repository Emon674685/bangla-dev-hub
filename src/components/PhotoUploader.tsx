import { Upload } from "lucide-react";
import { useCallback } from "react";

interface PhotoUploaderProps {
  onUpload: (file: File) => void;
  preview: string | null;
}

const PhotoUploader = ({ onUpload, preview }: PhotoUploaderProps) => {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onUpload(file);
      }
    },
    [onUpload]
  );

  return (
    <label
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="relative flex flex-col items-center justify-center w-full h-28 sm:h-40 border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
    >
      {preview ? (
        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
      ) : (
        <>
          <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground mb-2" />
          <p className="text-xs sm:text-sm text-center px-2">
            <span className="text-primary font-medium">Click to upload</span>
            <span className="text-muted-foreground"> or drag and drop</span>
          </p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">PNG, JPG (max 10MB)</p>
        </>
      )}
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </label>
  );
};

export default PhotoUploader;
