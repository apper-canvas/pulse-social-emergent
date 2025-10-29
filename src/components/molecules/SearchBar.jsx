import { useState } from "react";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search posts, users, or hashtags...",
  className,
  ...props 
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("relative", className)}
      {...props}
    >
      <div className="relative">
        <ApperIcon
          name="Search"
          size={20}
          className={cn(
            "absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200",
            isFocused ? "text-primary" : "text-gray-400"
          )}
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-4 py-2 sm:py-3 lg:py-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 text-sm sm:text-base lg:text-lg",
            isFocused
              ? "border-primary focus:ring-primary/20 bg-white"
              : "border-gray-200 bg-gray-50 focus:bg-white focus:border-primary focus:ring-primary/20"
          )}
        />
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            type="button"
            onClick={() => {
              setQuery("");
              onSearch && onSearch("");
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <ApperIcon name="X" size={18} />
          </motion.button>
        )}
      </div>
    </motion.form>
  );
};

export default SearchBar;