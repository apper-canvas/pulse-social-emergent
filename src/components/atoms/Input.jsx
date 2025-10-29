import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  className, 
  type = "text",
  error,
  label,
  placeholder,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "border-gray-200 focus:border-primary focus:ring-primary/20",
    error: "border-error focus:border-error focus:ring-error/20",
  };

  const variant = error ? "error" : "default";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(baseStyles, variants[variant], className)}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;