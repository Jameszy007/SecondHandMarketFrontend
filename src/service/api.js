import http from "./http.js";

// Mock user database for testing
const mockUsers = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "password123",
    token: "mock-jwt-token-123"
  },
  {
    id: 2,
    username: "demo",
    email: "demo@example.com", 
    password: "demo123",
    token: "mock-jwt-token-456"
  }
];

// Mock authentication functions
const register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Load existing users from localStorage or use default
      let users = [...mockUsers];
      try {
        const storedUsers = localStorage.getItem("mockUsers");
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (error) {
        console.log("Error loading stored users, using default:", error);
        users = [...mockUsers];
      }

      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        reject({ message: "User already exists with this email" });
        return;
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
        token: `mock-jwt-token-${Date.now()}`
      };
      
      users.push(newUser);
      
      // Store user data in localStorage for persistence
      localStorage.setItem("mockUsers", JSON.stringify(users));
      
      console.log("Registration successful for:", newUser.email);
      console.log("Total users:", users.length);
      
      resolve({ 
        message: "Registration successful",
        user: { id: newUser.id, username: newUser.username, email: newUser.email }
      });
    }, 1000); // Simulate network delay
  });
};

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Load users from localStorage if available, otherwise use default mockUsers
      let users = mockUsers;
      try {
        const storedUsers = localStorage.getItem("mockUsers");
        if (storedUsers) {
          users = JSON.parse(storedUsers);
        }
      } catch (error) {
        console.log("Error loading stored users, using default:", error);
        users = mockUsers;
      }
      
      // Find user
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        reject({ message: "Invalid email or password" });
        return;
      }

      // Store token in localStorage
      localStorage.setItem("token", user.token);
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      }));

      console.log("Login successful for:", user.email);
      console.log("Token stored:", user.token);

      // Dispatch custom event to notify components of auth change
      window.dispatchEvent(new Event('authChanged'));

      resolve({
        message: "Login successful",
        accessToken: user.token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    }, 1000); // Simulate network delay
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // Dispatch custom event to notify components of auth change
  window.dispatchEvent(new Event('authChanged'));
};

export const authService = {
  register,
  login,
  logout,
};

// —— Home —— //
export const homeApi = {
  getNewestItems: (limit = 10) =>
    http
      .get("/items", { params: { sort: "newest", limit } })
      .then((r) => r.data),
  searchItems: (keyword, page = 1) =>
    http
      .get("/items", { params: { search: keyword, page } })
      .then((r) => r.data),
  getReviews: (limit = 6) =>
    http.get("/reviews", { params: { limit } }).then((r) => r.data),
};

// —— Auth / Me —— //
export const authApi = {
  getMe: () => http.get("/me").then((r) => r.data),
};

export const reviewAPI = {
  uploadReview: async (reviewData) => {
    try {
      const resp = await http.post("/reviews", reviewData);
      return resp.data;
    } catch (error) {
      throw error.response ? error.response.data : Error("Fail to upload stay");
    }
  },

  getReviewsBySeller: async () => {
    try {
      const resp = await http.get("/reviews/sellerID");
      return resp.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : Error("Fail to get review list");
    }
  },

  deleteReview: async (reviewId) => {
    try {
      const resp = await http.delete(`/reviews/${reviewId}`);
      return resp.data;
    } catch (error) {
      throw error.response
        ? error.response.data
        : Error("Fail to delete review");
    }
  },
};

// item api
export const itemAPI = {
  // 商品详情
  getItemDetail: (id) => http.get(`/items/${id}`),

  // 商品列表
  getItemList: (params = {}) => http.get("/items", { params }),

  // 创建商品
  createItem: (data) => http.post("/items", data),

  // 更新商品
  updateItem: (id, data) => http.put(`/items/${id}`, data),

  // 删除商品
  deleteItem: (id) => http.delete(`/items/${id}`),

  // 收藏商品
  likeItem: (id) => http.post(`/items/${id}/like`),

  // 取消收藏
  unlikeItem: (id) => http.delete(`/items/${id}/like`),

  // 获取商品分类
  getCategories: () => http.get("/categories"),

  // 搜索商品
  searchItems: (query) => http.get("/items/search", { params: { q: query } }),
};

export const userAPI = {
  // 获取用户信息
  getUserInfo: (id) => http.get(`/users/${id}`),

  // 更新用户信息
  updateUserInfo: (id, data) => http.put(`/users/${id}`, data),

  // 获取用户收藏列表
  getUserLikes: (userId) => http.get(`/users/${userId}/likes`),

  // 获取用户发布列表
  getUserItems: (userId) => http.get(`/users/${userId}/items`),
};

// order api
export const orderAPI = {
  // 创建订单
  createOrder: (data) => http.post("/orders", data),

  // 获取订单列表
  getOrderList: (params = {}) => http.get("/orders", { params }),

  // 获取订单详情
  getOrderDetail: (id) => http.get(`/orders/${id}`),

  // 更新订单状态
  updateOrderStatus: (id, status) =>
    http.put(`/orders/${id}/status`, { status }),
};

// message api
export const messageAPI = {
  // 发送消息
  sendMessage: (data) => http.post("/messages", data),

  // 消息列表
  getMessageList: (params = {}) => http.get("/messages", { params }),

  // 标记消息已读
  markMessageRead: (id) => http.put(`/messages/${id}/read`),
};

export default {
  item: itemAPI,
  user: userAPI,
  order: orderAPI,
  message: messageAPI,
};
