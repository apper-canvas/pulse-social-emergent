import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const PostGrid = ({ 
  posts = [], 
  onPostClick,
  className,
  ...props 
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="Image" size={48} className="mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">No posts yet</p>
      </div>
    );
  }

return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4",
        className
      )}
      {...props}
    >
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
whileHover={{ scale: 1.02 }}
          onClick={() => onPostClick && onPostClick(post)}
          className="aspect-square bg-gray-100 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer relative group"
        >
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <ApperIcon name="FileText" size={24} className="text-gray-500" />
            </div>
          )}
          
          {/* Overlay with stats */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <ApperIcon name="Heart" size={16} />
                <span className="text-sm font-medium">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ApperIcon name="MessageCircle" size={16} />
                <span className="text-sm font-medium">{post.comments}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PostGrid;