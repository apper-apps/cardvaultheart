import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl border border-gray-100 transition-all duration-200";
  
  const variants = {
    default: "shadow-card",
    elevated: "shadow-card-hover",
    soft: "shadow-soft"
  };

  const hoverStyles = hover ? "hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.02] cursor-pointer" : "";

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;