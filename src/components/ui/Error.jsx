import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while processing your request. Please try again.", 
  onRetry,
  type = "default"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-error/10 to-red-600/10 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="text-error" size={40} />
        </div>
      </div>
      
      <div className="space-y-3 max-w-md">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <Button onClick={onRetry} variant="primary" icon="RefreshCw">
          Try Again
        </Button>
      )}

      <div className="text-sm text-gray-500">
        If the problem persists, please refresh the page or contact support.
      </div>
    </div>
  );
};

export default Error;