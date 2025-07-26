import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No data found", 
  message = "There's nothing to display here yet.", 
  actionLabel,
  onAction,
  icon = "Inbox",
  type = "default"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "contacts":
        return {
          icon: "Users",
          title: "No contacts yet",
          message: "Upload your first business card to get started building your digital contact database.",
          actionLabel: "Upload Business Card"
        };
      case "search":
        return {
          icon: "Search",
          title: "No matching contacts",
          message: "We couldn't find any contacts matching your search criteria. Try adjusting your search terms.",
          actionLabel: "Clear Search"
        };
      default:
        return { icon, title, message, actionLabel };
    }
  };

  const content = getEmptyContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center space-y-6">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <ApperIcon name={content.icon} className="text-gray-400" size={48} />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-full flex items-center justify-center">
          <ApperIcon name="Plus" className="text-primary" size={16} />
        </div>
      </div>
      
      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl font-bold text-gray-900">{content.title}</h3>
        <p className="text-gray-600 leading-relaxed">{content.message}</p>
      </div>

      {(onAction && content.actionLabel) && (
        <Button 
          onClick={onAction} 
          variant="primary" 
          size="lg"
          icon="Plus"
          className="mt-6"
        >
          {content.actionLabel}
        </Button>
      )}

      <div className="text-sm text-gray-500 mt-8">
        Tip: Business cards are processed instantly with our OCR technology
      </div>
    </div>
  );
};

export default Empty;