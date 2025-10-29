import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import NavigationBar from "@/components/molecules/NavigationBar";
import ApperIcon from "@/components/ApperIcon";
import Home from "@/components/pages/Home";
import Search from "@/components/pages/Search";
import Create from "@/components/pages/Create";
import Profile from "@/components/pages/Profile";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto lg:flex lg:gap-6 xl:gap-8">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden lg:block lg:w-64 xl:w-72 lg:flex-shrink-0">
          <div className="fixed lg:sticky lg:top-0 h-screen lg:h-auto">
            <NavigationBar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:max-w-2xl xl:max-w-3xl px-4 sm:px-6 lg:px-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Trending/Suggestions Sidebar */}
        <div className="hidden lg:block lg:w-80 xl:w-96 lg:flex-shrink-0">
          <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6 space-y-6">
            {/* Trending Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Trending Now
              </h2>
              <div className="space-y-3">
                {[
                  { tag: "photography", count: 1234 },
                  { tag: "travel", count: 987 },
                  { tag: "food", count: 765 },
                  { tag: "art", count: 543 },
                  { tag: "nature", count: 432 },
                ].map((hashtag, index) => (
                  <div
                    key={hashtag.tag}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                        <ApperIcon name="Hash" size={18} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          #{hashtag.tag}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {hashtag.count.toLocaleString()} posts
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-primary font-medium">
                      #{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Users */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Suggested for You
              </h2>
              <div className="space-y-4">
                {[
                  { name: "Sarah Johnson", username: "sarahj", avatar: null },
                  { name: "Mike Chen", username: "mikec", avatar: null },
                  { name: "Emily Davis", username: "emilyd", avatar: null },
                ].map((user, index) => (
                  <div
                    key={user.username}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {user.name}
                        </h3>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                    <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Your Activity
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posts this week</span>
                  <span className="text-sm font-semibold text-primary">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Likes received</span>
                  <span className="text-sm font-semibold text-primary">248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New followers</span>
                  <span className="text-sm font-semibold text-primary">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        <NavigationBar />
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </motion.div>
  );
}

export default App;