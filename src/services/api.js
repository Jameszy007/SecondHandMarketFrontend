import http from "./http";

// —— Home —— //
export const homeApi = {
  getNewestItems: (limit = 10) =>
    http.get("/items", { params: { sort: "newest", limit } }).then((r) => r.data),
  searchItems: (keyword, page = 1) =>
    http.get("/items", { params: { search: keyword, page } }).then((r) => r.data),
  getReviews: (limit = 6) =>
    http.get("/reviews", { params: { limit } }).then((r) => r.data),
};

// —— Auth / Me —— //
export const authApi = {
  getMe: () => http.get("/me").then((r) => r.data),
};
