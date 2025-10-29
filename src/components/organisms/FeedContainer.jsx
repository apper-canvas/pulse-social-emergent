import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PostCard from "@/components/molecules/PostCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { postService } from "@/services/api/postService";
import { cn } from "@/utils/cn";

const FeedContainer = ({ className, ...props }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      const data = await postService.getAll();
      setPosts(data);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts(false);
  };

  const handleLike = async (postId) => {
    try {
      // Optimistically update the UI
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      
      // Here you would typically call an API to update the like
      // await postService.like(postId);
      
      toast.success("Post liked!");
    } catch (err) {
      toast.error("Failed to like post");
      // Revert the optimistic update
      loadPosts(false);
    }
  };

  const handleComment = (postId) => {
    // Navigate to post detail or show comment modal
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId) => {
    // Handle share functionality
    if (navigator.share) {
      navigator.share({
        title: "Check out this post on Pulse",
        url: `${window.location.origin}/post/${postId}`,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return <Loading type="feed" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => loadPosts()}
        type="network"
      />
    );
  }

  if (posts.length === 0) {
    return (
      <Empty
        type="posts"
        title="No posts in your feed"
        description="Follow some users or create your first post to get started!"
        actionText="Create Post"
        onAction={() => console.log("Navigate to create post")}
      />
    );
  }

return (
    <div className={cn("space-y-6 lg:space-y-8", className)} {...props}>
      {/* Pull to refresh indicator */}
      {refreshing && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center space-x-2 text-primary">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Refreshing...</span>
          </div>
        </motion.div>
      )}

{/* Posts List */}
      <div className="space-y-6 lg:space-y-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          </motion.div>
        ))}
      </div>

{/* Load More Button */}
      <div className="text-center pt-4 sm:pt-6">
        <button
          onClick={handleRefresh}
          className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
        >
          Load more posts
        </button>
      </div>
    </div>
  );
};

export default FeedContainer;