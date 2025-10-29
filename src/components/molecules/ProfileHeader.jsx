import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ProfileHeader = ({ 
  user, 
  isCurrentUser = false,
  onFollow,
  onEdit,
  className,
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-2xl shadow-sm p-6", className)}
      {...props}
>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex items-center space-x-4 sm:space-x-0">
          <Avatar
            src={user.avatar}
            alt={user.displayName}
            size="xl"
            fallback={user.displayName?.[0]?.toUpperCase()}
          />
          <div className="flex-1 min-w-0 sm:hidden">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {user.displayName}
            </h1>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        </div>
        
        <div className="flex-1 min-w-0 hidden sm:block sm:ml-4">
          <h1 className="text-2xl font-bold text-gray-900 truncate">
            {user.displayName}
          </h1>
          <p className="text-gray-600 text-lg">@{user.username}</p>
          {user.bio && (
            <p className="text-gray-700 mt-2">{user.bio}</p>
          )}
        </div>
        
        {user.bio && (
          <div className="sm:hidden">
            <p className="text-gray-700 text-sm">{user.bio}</p>
          </div>
        )}
        
        <div className="flex flex-col space-y-2 w-full sm:w-auto">
          {isCurrentUser ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={onEdit}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Edit" size={16} />
              <span>Edit Profile</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onFollow}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="UserPlus" size={16} />
              <span>Follow</span>
            </Button>
          )}
        </div>
      </div>

{/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 border-t">
        <div className="text-center">
<div className="text-lg sm:text-2xl font-bold text-gray-900">
            {user.posts?.toLocaleString() || 0}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm">Posts</div>
        </div>
        <div className="text-center">
<div className="text-lg sm:text-2xl font-bold text-gray-900">
            {user.followers?.toLocaleString() || 0}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm">Followers</div>
        </div>
        <div className="text-center">
<div className="text-lg sm:text-2xl font-bold text-gray-900">
            {user.following?.toLocaleString() || 0}
          </div>
          <div className="text-gray-600 text-xs sm:text-sm">Following</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;