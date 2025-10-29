import postData from "@/services/mockData/posts.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get next ID
const getNextId = (data) => {
  const maxId = Math.max(...data.map(item => item.Id));
  return maxId + 1;
};

export const postService = {
  async getAll() {
    await delay(300);
    return [...postData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async getById(id) {
    await delay(200);
    const post = postData.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    return { ...post };
  },

  async getByUserId(userId) {
    await delay(250);
    return postData.filter(p => p.authorId === userId).map(p => ({ ...p }));
  },

  async create(postData) {
    await delay(400);
    const newPost = {
      Id: getNextId(postData),
      id: `post_${Date.now()}`,
      ...postData,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };
    
    // In a real app, this would be saved to a database
    console.log("Created post:", newPost);
    return newPost;
  },

  async update(id, updates) {
    await delay(300);
    const index = postData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Post not found");
    }
    
    const updatedPost = { ...postData[index], ...updates };
    console.log("Updated post:", updatedPost);
    return updatedPost;
  },

  async delete(id) {
    await delay(200);
    const index = postData.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Post not found");
    }
    
    console.log("Deleted post:", id);
    return true;
  },

  async like(id) {
    await delay(200);
    const post = postData.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    
    post.likes += 1;
    console.log("Liked post:", id);
    return post;
  },

  async unlike(id) {
    await delay(200);
    const post = postData.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error("Post not found");
    }
    
    post.likes = Math.max(0, post.likes - 1);
    console.log("Unliked post:", id);
    return post;
  }
};