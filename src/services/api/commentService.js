import commentData from "@/services/mockData/comments.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get next ID
const getNextId = (data) => {
  const maxId = Math.max(...data.map(item => item.Id));
  return maxId + 1;
};

export const commentService = {
  async getAll() {
    await delay(300);
    return commentData.map(comment => ({ ...comment }));
  },

  async getById(id) {
    await delay(200);
    const comment = commentData.find(c => c.Id === parseInt(id));
    if (!comment) {
      throw new Error("Comment not found");
    }
    return { ...comment };
  },

  async getByPostId(postId) {
    await delay(250);
    return commentData.filter(c => c.postId === postId).map(c => ({ ...c }));
  },

  async create(commentData) {
    await delay(400);
    const newComment = {
      Id: getNextId(commentData),
      id: `comment_${Date.now()}`,
      ...commentData,
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    
    // In a real app, this would be saved to a database
    console.log("Created comment:", newComment);
    return newComment;
  },

  async update(id, updates) {
    await delay(300);
    const index = commentData.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Comment not found");
    }
    
    const updatedComment = { ...commentData[index], ...updates };
    console.log("Updated comment:", updatedComment);
    return updatedComment;
  },

  async delete(id) {
    await delay(200);
    const index = commentData.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Comment not found");
    }
    
    console.log("Deleted comment:", id);
    return true;
  },

  async like(id) {
    await delay(200);
    const comment = commentData.find(c => c.Id === parseInt(id));
    if (!comment) {
      throw new Error("Comment not found");
    }
    
    comment.likes += 1;
    console.log("Liked comment:", id);
    return comment;
  }
};