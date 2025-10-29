import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "primary",
  size = "md",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center rounded-full font-medium transition-all duration-200";
  
  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/20",
    secondary: "bg-secondary/10 text-secondary border border-secondary/20",
    success: "bg-success/10 text-success border border-success/20",
    warning: "bg-warning/10 text-warning border border-warning/20",
    error: "bg-error/10 text-error border border-error/20",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;