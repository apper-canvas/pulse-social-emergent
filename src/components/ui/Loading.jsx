import { motion } from "framer-motion";

const Loading = ({ type = "feed" }) => {
  const renderFeedSkeleton = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse" />
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 animate-pulse" />
          </div>
          <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse mb-4" />
          <div className="flex items-center space-x-6">
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderProfileSkeleton = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mb-2" />
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {type === "feed" && renderFeedSkeleton()}
      {type === "profile" && renderProfileSkeleton()}
      {type === "search" && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Loading;