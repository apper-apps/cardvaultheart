import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const ContactFormField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  icon, 
  placeholder, 
  error, 
  required = false 
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <ApperIcon 
            name={icon} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            size={16} 
          />
        )}
        <Input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={icon ? "pl-10" : ""}
          error={error}
        />
      </div>
    </div>
  );
};

export default ContactFormField;