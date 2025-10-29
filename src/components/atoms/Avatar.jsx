import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Avatar = forwardRef(({ 
  className, 
  src,
  alt,
  size = "md",
  fallback,
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
    xl: "w-20 h-20 text-lg",
  };

  const baseStyles = "rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden";

  if (src) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    >
      {fallback ? (
        <span className="font-semibold text-primary">
          {fallback}
        </span>
      ) : (
        <ApperIcon name="User" className="text-primary" size={size === "sm" ? 16 : size === "md" ? 24 : size === "lg" ? 32 : 40} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;