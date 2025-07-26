import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  isLoading = false,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-primary/20 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    secondary: "bg-white text-secondary border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-secondary/20 shadow-sm hover:shadow-md",
    success: "bg-gradient-to-r from-success to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 focus:ring-success/20 shadow-md hover:shadow-lg transform hover:scale-[1.02]",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/20 shadow-sm hover:shadow-md",
    ghost: "text-secondary hover:bg-gray-100 hover:text-gray-900 focus:ring-secondary/20"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ApperIcon name="Loader2" className="animate-spin" size={16} />
      ) : (
        <>
          {icon && iconPosition === "left" && <ApperIcon name={icon} size={16} />}
          {children}
          {icon && iconPosition === "right" && <ApperIcon name={icon} size={16} />}
        </>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;