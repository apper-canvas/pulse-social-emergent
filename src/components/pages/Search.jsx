import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import SearchResults from "@/components/organisms/SearchResults";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "Posts", icon: "FileText" },
    { id: "users", label: "Users", icon: "Users" },
    { id: "hashtags", label: "Hashtags", icon: "Hash" },
  ];

  const trendingHashtags = [
    { tag: "photography", count: 1234 },
    { tag: "travel", count: 987 },
    { tag: "food", count: 765 },
    { tag: "art", count: 543 },
    { tag: "nature", count: 432 },
  ];

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleHashtagClick = (hashtag) => {
    setQuery(hashtag);
    setActiveTab("posts");
  };

  return (
<div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 lg:hidden"
      >
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="Search" size={20} className="text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold gradient-text">Discover</h1>
          </div>
        </div>
      </motion.header>

{/* Search Bar */}
      <div className="py-4 sm:py-6 lg:py-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search posts, users, or hashtags..."
          className="mb-6"
        />

{/* Search Tabs */}
        <div className="flex items-center space-x-1 mb-4 sm:mb-6 bg-white rounded-xl p-1 shadow-sm overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
className={cn(
                "flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {query ? (
          <SearchResults
            query={query}
            type={activeTab}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Trending Hashtags */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Trending Hashtags
              </h2>
              <div className="space-y-3">
                {trendingHashtags.map((hashtag, index) => (
                  <motion.div
                    key={hashtag.tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleHashtagClick(hashtag.tag)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <ApperIcon name="Hash" size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          #{hashtag.tag}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {hashtag.count.toLocaleString()} posts
                        </p>
                      </div>
                    </div>
                    <Badge variant="primary" size="sm">
                      #{index + 1}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Suggested for You
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          User {index}
                        </h3>
                        <p className="text-sm text-gray-500">
                          @user{index}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Follow
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Searches
                </h2>
                <button className="text-sm text-primary hover:text-primary/80">
                  Clear All
                </button>
              </div>
              <div className="text-center py-8 text-gray-500">
                <ApperIcon name="Clock" size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No recent searches</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;