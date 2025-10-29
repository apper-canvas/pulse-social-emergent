import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ProfileHeader from "@/components/molecules/ProfileHeader";
import PostGrid from "@/components/molecules/PostGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { userService } from "@/services/api/userService";
import { postService } from "@/services/api/postService";
import { cn } from "@/utils/cn";

const UserProfile = ({ 
  userId = "user1", // Default to current user
  className,
  ...props 
}) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [userData, userPosts] = await Promise.all([
        userService.getById(userId),
        postService.getByUserId(userId)
      ]);
      
      setUser(userData);
      setPosts(userPosts);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      // Optimistically update UI
      setUser(prev => ({
        ...prev,
        followers: prev.followers + 1
      }));
      
      toast.success(`You are now following ${user.displayName}!`);
    } catch (err) {
      toast.error("Failed to follow user");
      // Revert optimistic update
      setUser(prev => ({
        ...prev,
        followers: prev.followers - 1
      }));
    }
  };

  const handleEdit = () => {
    // Open edit profile modal
    console.log("Edit profile");
  };

  const handlePostClick = (post) => {
    // Navigate to post detail
    console.log("Open post:", post.id);
  };

  if (loading) {
    return <Loading type="profile" />;
  }

  if (error) {
    return (
      <Error
        message={error}
        onRetry={loadUserData}
        type="network"
      />
    );
  }

  if (!user) {
    return (
      <Error
        message="User not found"
        type="notFound"
      />
    );
  }

  const tabs = [
    { id: "posts", label: "Posts", count: posts.length },
    { id: "saved", label: "Saved", count: 0 },
    { id: "tagged", label: "Tagged", count: 0 },
  ];

return (
    <div className={cn("space-y-6 lg:space-y-8", className)} {...props}>
      {/* Profile Header */}
      <ProfileHeader
        user={user}
        isCurrentUser={userId === "user1"} // In a real app, compare with actual current user
        onFollow={handleFollow}
        onEdit={handleEdit}
      />

      {/* Profile Tabs */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

{/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "posts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {posts.length > 0 ? (
                <PostGrid
                  posts={posts}
                  onPostClick={handlePostClick}
                />
              ) : (
                <Empty
                  type="posts"
                  title="No posts yet"
                  description={
                    userId === "user1" 
                      ? "Share your first moment with the world!"
                      : `${user.displayName} hasn't posted anything yet.`
                  }
                  actionText={userId === "user1" ? "Create Post" : null}
                  onAction={userId === "user1" ? () => console.log("Navigate to create") : null}
                />
              )}
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Empty
                type="posts"
                title="No saved posts"
                description="Posts you save will appear here."
                actionText="Explore Posts"
                onAction={() => console.log("Navigate to explore")}
              />
            </motion.div>
          )}

          {activeTab === "tagged" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Empty
                type="posts"
                title="No tagged posts"
                description="Posts you're tagged in will appear here."
                actionText="Explore Posts"
                onAction={() => console.log("Navigate to explore")}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;