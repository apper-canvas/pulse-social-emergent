import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, type = "general" }) => {
  const getErrorContent = () => {
    switch (type) {
      case "network":
        return {
          icon: "WifiOff",
          title: "No Connection",
          description: "Please check your internet connection and try again.",
        };
      case "notFound":
        return {
          icon: "Search",
          title: "Not Found",
          description: "We couldn't find what you're looking for.",
        };
      default:
        return {
          icon: "AlertCircle",
          title: "Oops!",
          description: message,
        };
    }
  };

  const { icon, title, description } = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-error/20 to-error/30 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={32} className="text-error" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary"
        >
          <ApperIcon name="RefreshCw" size={20} className="mr-2" />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;