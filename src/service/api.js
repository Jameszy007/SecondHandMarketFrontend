import http from "./http.js";

const register = (username, email, password) => {
  return http.post("/api/auth/register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return http
    .post("/api/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
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
