import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Avatar from "@/components/atoms/Avatar";
import { cn } from "@/utils/cn";

const CommentThread = ({ 
  comments = [], 
  postId,
  onAddComment,
  onLikeComment,
  currentUser,
  className,
  ...props 
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState(new Set());
  const [commentLikes, setCommentLikes] = useState({});

  useEffect(() => {
    const initialLiked = new Set();
    const initialLikes = {};
    comments.forEach(comment => {
      if (comment.isLikedByCurrentUser) {
        initialLiked.add(comment.Id);
      }
      initialLikes[comment.Id] = comment.likes || 0;
    });
    setLikedComments(initialLiked);
    setCommentLikes(initialLikes);
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
const newCommentData = await onAddComment({
        content: newComment.trim(),
        postId,
        parentId: replyingTo,
      });
      
      if (newCommentData) {
        setCommentLikes(prev => ({
          ...prev,
          [newCommentData.Id]: 0
        }));
      }
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

  const handleLikeComment = async (commentId) => {
    try {
      const isLiked = likedComments.has(commentId);
      
      setLikedComments(prev => {
        const newSet = new Set(prev);
        if (isLiked) {
          newSet.delete(commentId);
        } else {
          newSet.add(commentId);
        }
        return newSet;
      });

      setCommentLikes(prev => ({
        ...prev,
        [commentId]: isLiked ? (prev[commentId] || 0) - 1 : (prev[commentId] || 0) + 1
      }));

      if (onLikeComment) {
        await onLikeComment(commentId);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLikeComment(comment.Id)}
            className={cn(
              "transition-all duration-200",
              likedComments.has(comment.Id) && "text-error"
            )}
            >
            <motion.div
              animate={likedComments.has(comment.Id) ? {
                scale: [1, 1.3, 1],
              } : {}}
              transition={{ duration: 0.3 }}
            >
              <ApperIcon 
                name={likedComments.has(comment.Id) ? "Heart" : "Heart"} 
                size={16}
                className={likedComments.has(comment.Id) ? "fill-current" : ""}
              />
            </motion.div>
            <span>{commentLikes[comment.Id] || comment.likes || 0}</span>
          </Button>
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