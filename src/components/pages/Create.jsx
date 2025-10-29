import { motion } from "framer-motion";
import CreatePostForm from "@/components/organisms/CreatePostForm";
import ApperIcon from "@/components/ApperIcon";

const Create = () => {
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
              <ApperIcon name="Plus" size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">Create</h1>
          </div>
        </div>
      </motion.header>

{/* Main Content */}
      <main className="py-4 sm:py-6 lg:py-8">
        <CreatePostForm />
      </main>
    </div>
  );
};

export default Create;