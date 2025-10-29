import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const CreatePostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  currentUser,
  className,
  ...props 
}) => {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const hashtagArray = hashtags
        .split(/[,\s]+/)
        .filter(tag => tag.trim())
        .map(tag => tag.replace(/^#/, ""));

      await onSubmit({
        content: content.trim(),
        hashtags: hashtagArray,
        imageUrl: imagePreview,
      });

      setContent("");
      setHashtags("");
      setImagePreview(null);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              "bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4 sm:mx-0",
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
{/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Create Post</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="!p-2"
              >
                <ApperIcon name="X" size={20} />
              </Button>
            </div>

{/* Content */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="flex items-start space-x-3">
                <Avatar
                  src={currentUser?.avatar}
                  alt={currentUser?.displayName}
                  size="md"
                  fallback={currentUser?.displayName?.[0]?.toUpperCase()}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 mb-2">
                    {currentUser?.displayName}
                  </p>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 min-h-[120px]"
                    maxLength={500}
                  />
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                  >
                    <ApperIcon name="X" size={16} />
                  </button>
                </div>
              )}

              {/* Hashtags */}
              <Input
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="Add hashtags (separated by commas)"
                label="Hashtags"
              />

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer text-primary hover:text-primary/80 transition-colors">
                    <ApperIcon name="Image" size={20} />
                    <span className="text-sm font-medium">Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <ApperIcon name="Smile" size={20} />
                    <span className="text-sm font-medium">Emoji</span>
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {content.length}/500
                  </span>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={!content.trim() || isSubmitting}
                    className="min-w-[100px]"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePostModal;