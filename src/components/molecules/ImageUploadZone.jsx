import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ImageUploadZone = ({ onImageUpload, isUploading, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group",
          isDragOver 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-gray-300 hover:border-primary hover:bg-primary/5",
          isUploading && "pointer-events-none opacity-50"
        )}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isDragOver 
              ? "bg-primary text-white scale-110" 
              : "bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary group-hover:from-primary/20 group-hover:to-blue-600/20"
          )}>
            {isUploading ? (
              <ApperIcon name="Loader2" className="animate-spin" size={24} />
            ) : (
              <ApperIcon name="Upload" size={24} />
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {isUploading ? "Processing..." : "Upload Business Card"}
            </h3>
            <p className="text-gray-600">
              {isUploading 
                ? "Extracting contact information..." 
                : "Drag and drop an image here, or click to browse"
              }
            </p>
            <p className="text-sm text-gray-500">
              Supports JPG, PNG, and other image formats
            </p>
          </div>
          
          {!isUploading && (
            <Button variant="outline" size="md">
              Choose File
            </Button>
          )}
        </div>
        
        {isDragOver && (
          <div className="absolute inset-0 rounded-xl bg-primary/10 border-2 border-primary animate-pulse" />
        )}
      </div>
    </div>
  );
};

export default ImageUploadZone;