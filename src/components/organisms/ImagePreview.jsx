import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const ImagePreview = ({ 
  imageUrl, 
  extractedData, 
  onExtract, 
  onClear, 
  isExtracting = false 
}) => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Business Card Preview</h3>
        <div className="flex items-center gap-2">
          {extractedData && (
            <div className="flex items-center gap-2 text-success">
              <ApperIcon name="CheckCircle" size={16} />
              <span className="text-sm font-medium">Extracted</span>
            </div>
          )}
          <Button
            onClick={onClear}
            variant="ghost"
            size="sm"
            icon="X"
            className="text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Image Display */}
        <div className="relative">
          <div 
            className="w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer group relative"
            onClick={() => setShowFullImage(true)}
          >
            <img 
              src={imageUrl} 
              alt="Business card preview" 
              className="w-full h-auto max-h-[300px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ApperIcon name="ZoomIn" className="text-gray-700" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Extraction Status */}
        <div className="flex items-center justify-between">
          {isExtracting ? (
            <div className="flex items-center gap-3">
              <ApperIcon name="Loader2" className="animate-spin text-primary" size={20} />
              <span className="text-sm text-gray-600">Extracting contact information...</span>
            </div>
          ) : extractedData ? (
            <div className="flex items-center gap-3">
              <ApperIcon name="CheckCircle" className="text-success" size={20} />
              <span className="text-sm text-gray-600">Contact information extracted successfully</span>
            </div>
          ) : (
            <Button
              onClick={onExtract}
              variant="primary"
              icon="Scan"
              size="md"
            >
              Extract Information
            </Button>
          )}
        </div>

        {/* Extracted Data Preview */}
        {extractedData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-success/5 to-emerald-600/5 rounded-lg p-4 border border-success/20"
          >
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ApperIcon name="Eye" size={16} />
              Extracted Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(extractedData).map(([key, value]) => (
                value && (
                  <div key={key} className="flex items-start gap-2">
                    <span className="font-medium text-gray-700 capitalize min-w-[60px]">
                      {key}:
                    </span>
                    <span className="text-gray-900 break-words">{value}</span>
                  </div>
                )
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Full Screen Image Modal */}
      {showFullImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowFullImage(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={imageUrl} 
              alt="Business card full view" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <Button
              onClick={() => setShowFullImage(false)}
              variant="secondary"
              size="sm"
              icon="X"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </Card>
  );
};

export default ImagePreview;