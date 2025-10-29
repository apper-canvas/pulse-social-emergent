import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PostCard from "@/components/molecules/PostCard";
import PostGrid from "@/components/molecules/PostGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { postService } from "@/services/api/postService";
import { userService } from "@/services/api/userService";
import { cn } from "@/utils/cn";

const SearchResults = ({ 
  query, 
  type = "posts", // "posts", "users", "hashtags"
  className,
  ...props 
}) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid", "list"

  const searchPosts = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      
      const allPosts = await postService.getAll();
      
      if (!searchQuery.trim()) {
        setResults(allPosts);
        return;
      }

      const filtered = allPosts.filter(post => {
        const contentMatch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const hashtagMatch = post.hashtags?.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const authorMatch = post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return contentMatch || hashtagMatch || authorMatch;
      });

      setResults(filtered);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to search posts");
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      
      const allUsers = await userService.getAll();
      
      if (!searchQuery.trim()) {
        setResults(allUsers);
        return;
      }

      const filtered = allUsers.filter(user => {
        const nameMatch = user.displayName.toLowerCase().includes(searchQuery.toLowerCase());
        const usernameMatch = user.username.toLowerCase().includes(searchQuery.toLowerCase());
        const bioMatch = user.bio?.toLowerCase().includes(searchQuery.toLowerCase());
        
        return nameMatch || usernameMatch || bioMatch;
      });

      setResults(filtered);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const searchHashtags = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      
      const allPosts = await postService.getAll();
      const hashtagCounts = {};
      
      allPosts.forEach(post => {
        post.hashtags?.forEach(tag => {
          const normalizedTag = tag.toLowerCase();
          hashtagCounts[normalizedTag] = (hashtagCounts[normalizedTag] || 0) + 1;
        });
      });

      let hashtags = Object.entries(hashtagCounts).map(([tag, count]) => ({
        tag,
        count,
        id: tag,
      }));

      if (searchQuery.trim()) {
        hashtags = hashtags.filter(({ tag }) =>
          tag.includes(searchQuery.toLowerCase())
        );
      }

      // Sort by count (most popular first)
      hashtags.sort((a, b) => b.count - a.count);
      
      setResults(hashtags);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to search hashtags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (type === "posts") {
      searchPosts(query);
    } else if (type === "users") {
      searchUsers(query);
    } else if (type === "hashtags") {
      searchHashtags(query);
    }
  }, [query, type]);

  const handleLike = async (postId) => {
    try {
      setResults(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 }
          : post
      ));
      toast.success("Post liked!");
    } catch (err) {
      toast.error("Failed to like post");
    }
  };

  const handleFollow = async (userId) => {
    try {
      toast.success("User followed!");
    } catch (err) {
      toast.error("Failed to follow user");
    }
  };

  const handleHashtagClick = (hashtag) => {
    // Navigate to hashtag feed or update search query
    console.log("Clicked hashtag:", hashtag);
  };

  if (loading) {
    return <Loading type="search" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={() => {
          if (type === "posts") searchPosts(query);
          else if (type === "users") searchUsers(query);
          else if (type === "hashtags") searchHashtags(query);
        }}
        type="network"
      />
    );
  }

  if (results.length === 0) {
    return (
      <Empty
        type="search"
        title="No results found"
        description={`No ${type} found for "${query}". Try different keywords or browse trending content.`}
        actionText="Explore Trending"
        onAction={() => console.log("Navigate to trending")}
      />
    );
  }

  const renderPostResults = () => {
    if (viewMode === "grid") {
      return (
        <PostGrid
          posts={results}
          onPostClick={(post) => console.log("Open post:", post.id)}
        />
      );
    }

    return (
      <div className="space-y-6">
        {results.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={(id) => console.log("Comment on:", id)}
            onShare={(id) => console.log("Share:", id)}
          />
        ))}
      </div>
    );
  };

const renderUserResults = () => (
    <div className="space-y-3 sm:space-y-4">
      {results.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 w-full sm:w-auto min-w-0">
              <Avatar
                src={user.avatar}
                alt={user.displayName}
                size="md"
                fallback={user.displayName?.[0]?.toUpperCase()}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {user.displayName}
                </h3>
                <p className="text-gray-600 text-sm truncate">@{user.username}</p>
                {user.bio && (
                  <p className="text-gray-700 text-sm mt-1 line-clamp-2 hidden sm:block">
                    {user.bio}
                  </p>
                )}
                <div className="flex items-center space-x-3 sm:space-x-4 mt-2 text-sm text-gray-500">
                  <span>{user.followers} followers</span>
                  <span>{user.posts} posts</span>
                </div>
              </div>
</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleFollow(user.id)}
              className="btn-primary text-sm px-4 py-2 w-full sm:w-auto"
            >
              Follow
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderHashtagResults = () => (
    <div className="space-y-3">
      {results.map((hashtag) => (
        <motion.div
          key={hashtag.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleHashtagClick(hashtag.tag)}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <ApperIcon name="Hash" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  #{hashtag.tag}
                </h3>
                <p className="text-sm text-gray-500">
                  {hashtag.count} {hashtag.count === 1 ? "post" : "posts"}
                </p>
              </div>
            </div>
            <Badge variant="primary" size="sm">
              Trending
            </Badge>
          </div>
        </motion.div>
      ))}
    </div>
  );

return (
    <div className={cn("space-y-4 sm:space-y-6", className)} {...props}>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {query ? `Results for "${query}"` : `All ${type}`}
          </h2>
          <p className="text-gray-600 text-sm">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </p>
        </div>
        {type === "posts" && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "grid" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <ApperIcon name="Grid3X3" size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === "list" 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <ApperIcon name="List" size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Results Content */}
      {type === "posts" && renderPostResults()}
      {type === "users" && renderUserResults()}
      {type === "hashtags" && renderHashtagResults()}
    </div>
  );
};

export default SearchResults;