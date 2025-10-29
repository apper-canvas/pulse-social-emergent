import { useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CommentThread = ({ 
  comments = [], 
  postId,
  onAddComment,
  currentUser,
  className,
  ...props 
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment({
        content: newComment.trim(),
        postId,
        parentId: replyingTo,
      });
      setNewComment("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleLikeComment = (commentId) => {
    // Handle comment like
    console.log("Like comment:", commentId);
  };

  const renderComment = (comment, isReply = false) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex space-x-3",
        isReply && "ml-12 mt-3"
      )}
    >
      <Avatar
        src={comment.authorAvatar}
        alt={comment.authorName}
        size="sm"
        fallback={comment.authorName?.[0]?.toUpperCase()}
      />
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-2xl px-4 py-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900 text-sm">
              {comment.authorName}
            </span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-800 text-sm">{comment.content}</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-2">
          <button
            onClick={() => handleLikeComment(comment.id)}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary transition-colors"
          >
            <ApperIcon name="Heart" size={14} />
            <span>{comment.likes || 0}</span>
          </button>
          
          {!isReply && (
            <button
              onClick={() => handleReply(comment.id)}
              className="text-xs text-gray-500 hover:text-primary transition-colors"
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  const topLevelComments = comments.filter(comment => !comment.parentId);
  const getReplies = (parentId) => comments.filter(comment => comment.parentId === parentId);

return (
    <div className={cn("space-y-3 sm:space-y-4", className)} {...props}>
      {/* Comments List */}
      <div className="space-y-3 sm:space-y-4">
        {topLevelComments.length > 0 ? (
          topLevelComments.map(comment => (
            <div key={comment.id}>
              {renderComment(comment)}
              {getReplies(comment.id).map(reply => renderComment(reply, true))}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <ApperIcon name="MessageCircle" size={32} className="mx-auto mb-2 text-gray-300" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="border-t pt-4">
        <div className="flex space-x-3">
          <Avatar
            src={currentUser?.avatar}
            alt={currentUser?.displayName}
            size="sm"
            fallback={currentUser?.displayName?.[0]?.toUpperCase()}
          />
<div className="flex-1">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input
                type="text"
                value={newComment}
onChange={(e) => setNewComment(e.target.value)}
                placeholder={replyingTo ? "Write a reply..." : "Write a comment..."}
                className="flex-1 px-4 py-2 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all duration-200 text-sm sm:text-base"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || isSubmitting}
                loading={isSubmitting}
                className="rounded-full"
              >
                <ApperIcon name="Send" size={16} />
              </Button>
            </div>
            {replyingTo && (
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-sm text-gray-500">
                  Replying to {comments.find(c => c.id === replyingTo)?.authorName}
                </span>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentThread;