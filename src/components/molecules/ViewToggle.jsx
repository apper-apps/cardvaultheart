import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ViewToggle = ({ view, onViewChange, className }) => {
  const views = [
    { key: "cards", icon: "Grid3X3", label: "Card View" },
    { key: "list", icon: "List", label: "List View" }
  ];

  return (
    <div className={cn("flex bg-white rounded-lg border border-gray-200 shadow-sm p-1", className)}>
      {views.map((viewOption) => (
        <button
          key={viewOption.key}
          onClick={() => onViewChange(viewOption.key)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
            view === viewOption.key
              ? "bg-gradient-to-r from-primary to-blue-600 text-white shadow-md"
              : "text-gray-600 hover:text-primary hover:bg-gray-50"
          )}
          title={viewOption.label}
        >
          <ApperIcon name={viewOption.icon} size={16} />
          <span className="hidden sm:inline">{viewOption.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;