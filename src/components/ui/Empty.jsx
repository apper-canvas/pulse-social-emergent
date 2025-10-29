import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "Nothing here yet", 
  description = "Be the first to share something amazing!", 
  actionText = "Get Started",
  onAction,
  type = "general"
}) => {
  const getEmptyContent = () => {
    switch (type) {
      case "posts":
        return {
          icon: "ImagePlus",
          title: "No posts yet",
          description: "Start sharing your moments with the world!",
          actionText: "Create Your First Post",
        };
      case "search":
        return {
          icon: "Search",
          title: "No results found",
          description: "Try adjusting your search terms or browse trending content.",
          actionText: "Explore Trending",
        };
      case "comments":
        return {
          icon: "MessageCircle",
          title: "No comments yet",
          description: "Be the first to start the conversation!",
          actionText: "Add a Comment",
        };
      case "followers":
        return {
          icon: "Users",
          title: "No followers yet",
          description: "Share great content to grow your community!",
          actionText: "Create a Post",
        };
      default:
        return {
          icon: "Sparkles",
          title,
          description,
          actionText,
        };
    }
  };

  const { icon, title: emptyTitle, description: emptyDescription, actionText: emptyActionText } = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={36} className="text-primary" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{emptyTitle}</h3>
      <p className="text-gray-600 mb-6 max-w-md">{emptyDescription}</p>
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary"
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {emptyActionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;