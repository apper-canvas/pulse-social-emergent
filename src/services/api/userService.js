import userData from "@/services/mockData/users.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to get next ID
const getNextId = (data) => {
  const maxId = Math.max(...data.map(item => item.Id));
  return maxId + 1;
};

export const userService = {
  async getAll() {
    await delay(300);
    return userData.map(user => ({ ...user }));
  },

  async getById(id) {
    await delay(200);
    const user = userData.find(u => u.Id === parseInt(id) || u.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return { ...user };
  },

  async create(userData) {
    await delay(400);
    const newUser = {
      Id: getNextId(userData),
      id: `user_${Date.now()}`,
      ...userData,
      followers: 0,
      following: 0,
      posts: 0,
    };
    
    // In a real app, this would be saved to a database
    console.log("Created user:", newUser);
    return newUser;
  },

  async update(id, updates) {
    await delay(300);
    const index = userData.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    const updatedUser = { ...userData[index], ...updates };
    console.log("Updated user:", updatedUser);
    return updatedUser;
  },

  async delete(id) {
    await delay(200);
    const index = userData.findIndex(u => u.Id === parseInt(id));
    if (index === -1) {
      throw new Error("User not found");
    }
    
    console.log("Deleted user:", id);
    return true;
  },

  async follow(userId) {
    await delay(200);
    const user = userData.find(u => u.Id === parseInt(userId));
    if (!user) {
      throw new Error("User not found");
    }
    
    user.followers += 1;
    console.log("Followed user:", userId);
    return user;
  },

  async unfollow(userId) {
    await delay(200);
    const user = userData.find(u => u.Id === parseInt(userId));
    if (!user) {
      throw new Error("User not found");
    }
    
    user.followers = Math.max(0, user.followers - 1);
    console.log("Unfollowed user:", userId);
    return user;
  }
};