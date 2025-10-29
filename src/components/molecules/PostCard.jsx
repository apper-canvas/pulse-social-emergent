import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import CommentThread from "@/components/molecules/CommentThread";
import { cn } from "@/utils/cn";
import { commentService } from "@/services/api/commentService";
import { toast } from "react-toastify";

const PostCard = ({ 
  post, 
  onLike, 
  onComment, 
  onShare,
  className,
  ...props 
}) => {
const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(post.comments);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    if (showComments && comments.length === 0) {
      loadComments();
    }
  }, [showComments]);

  const loadComments = async () => {
    try {
      setLoadingComments(true);
      const postComments = await commentService.getByPostId(post.id);
      setComments(postComments);
    } catch (error) {
      console.error("Error loading comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike && onLike(post.id);
  };

const handleComment = () => {
    setShowComments(!showComments);
    onComment && onComment(post.id);
  };

  const handleAddComment = async (commentData) => {
    try {
      const newComment = await commentService.create({
        ...commentData,
        authorId: "user1",
        authorName: "Current User",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      });
      
      setComments(prev => [...prev, newComment]);
      setCommentsCount(prev => prev + 1);
      toast.success("Comment added successfully!");
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
      throw error;
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await commentService.like(commentId);
      toast.success("Comment liked!");
    } catch (error) {
      console.error("Error liking comment:", error);
      toast.error("Failed to like comment");
    }
  };

  const handleShare = () => {
    onShare && onShare(post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
className={cn("bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200", className)}
      {...props}
    >
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar
            src={post.authorAvatar}
            alt={post.authorName}
            size="md"
            fallback={post.authorName?.[0]?.toUpperCase()}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {post.authorName}
            </h3>
            <p className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </p>
          </div>
          <Button variant="ghost" size="sm">
            <ApperIcon name="MoreHorizontal" size={20} />
          </Button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-900 whitespace-pre-wrap mb-3">
            {post.content}
          </p>
          
{/* Hashtags */}
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
              {post.hashtags.map((tag, index) => (
                <Badge key={index} variant="primary" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

{/* Post Image */}
          {post.imageUrl && (
            <div className="rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 mb-4">
              <img
src={post.imageUrl}
                alt="Post content"
                className="w-full h-48 sm:h-64 object-cover"
              />
            </div>
          )}
        </div>

{/* Post Actions */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={cn(
                "flex items-center space-x-2 transition-all duration-200",
                isLiked ? "text-red-500" : "text-gray-500 hover:text-red-500"
              )}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ApperIcon
                  name={isLiked ? "Heart" : "Heart"}
                  size={20}
                  className={isLiked ? "fill-current" : ""}
                />
              </motion.div>
              <span className="text-sm font-medium">{likesCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleComment}
              className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-all duration-200"
            >
<ApperIcon name="MessageCircle" size={20} />
              <span className="text-sm font-medium">{commentsCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-all duration-200"
            >
              <ApperIcon name="Share" size={20} />
              <span className="text-sm font-medium">Share</span>
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-500 hover:text-accent transition-all duration-200"
          >
            <ApperIcon name="Bookmark" size={20} />
          </motion.button>
        </div>
      </div>
{showComments && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-100 pt-4"
        >
          {loadingComments ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <CommentThread
              comments={comments}
              postId={post.id}
              onAddComment={handleAddComment}
              onLikeComment={handleLikeComment}
              currentUser={{
                id: "user1",
                name: "Current User",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }}
            />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PostCard;