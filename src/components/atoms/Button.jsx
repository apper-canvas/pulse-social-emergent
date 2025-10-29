import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  children,
  disabled,
  loading,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/30",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30",
    outline: "border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary hover:bg-primary/5",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-primary",
    danger: "bg-error text-white hover:bg-error/90 hover:shadow-lg hover:shadow-error/30",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;