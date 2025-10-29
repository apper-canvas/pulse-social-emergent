import { motion } from "framer-motion";
import UserProfile from "@/components/organisms/UserProfile";
import ApperIcon from "@/components/ApperIcon";

const Profile = () => {
return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 lg:hidden"
      >
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="User" size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Profile</h1>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ApperIcon name="Settings" size={20} className="text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ApperIcon name="Share" size={20} className="text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

{/* Main Content */}
      <main className="py-4 sm:py-6 lg:py-8">
        <UserProfile />
      </main>
    </div>
  );
};

export default Profile;