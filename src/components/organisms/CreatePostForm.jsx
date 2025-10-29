import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { postService } from "@/services/api/postService";
import { userService } from "@/services/api/userService";
import { cn } from "@/utils/cn";

const CreatePostForm = ({ className, ...props }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock current user - in a real app, this would come from auth context
  const currentUser = {
    id: "user1",
    username: "current_user",
    displayName: "Current User",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please write something to share!");
      return;
    }

    setIsSubmitting(true);
    try {
      const hashtagArray = hashtags
        .split(/[,\s]+/)
        .filter(tag => tag.trim())
        .map(tag => tag.replace(/^#/, ""));

      const newPost = {
        content: content.trim(),
        hashtags: hashtagArray,
        imageUrl: imagePreview,
        authorId: currentUser.id,
        authorName: currentUser.displayName,
        authorAvatar: currentUser.avatar,
      };

      await postService.create(newPost);
      
      toast.success("Post created successfully!");
      setContent("");
      setHashtags("");
      setImagePreview(null);
      navigate("/");
    } catch (error) {
      toast.error("Failed to create post");
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size must be less than 5MB");
        return;
      }
      
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white rounded-2xl shadow-sm", className)}
      {...props}
{...props}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="!p-2"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="flex items-start space-x-3">
            <Avatar
              src={currentUser.avatar}
              alt={currentUser.displayName}
              size="md"
              fallback={currentUser.displayName?.[0]?.toUpperCase()}
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 mb-2">
                {currentUser.displayName}
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full resize-none border-none outline-none text-lg placeholder-gray-500 min-h-[120px] focus:ring-0"
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {content.length}/500
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
<img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 sm:h-64 object-cover rounded-xl"
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 pt-4 border-t">
            <div className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto">
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
              <button
                type="button"
                className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ApperIcon name="MapPin" size={20} />
                <span className="text-sm font-medium">Location</span>
              </button>
</div>

            <div className="flex items-center justify-between sm:justify-end space-x-3">
              <span className="text-sm text-gray-500 sm:mr-3">
                {content.length}/500
              </span>
              <Button
              type="submit"
              loading={isSubmitting}
              disabled={!content.trim() || isSubmitting}
              className="min-w-[100px]"
            >
{isSubmitting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePostForm;