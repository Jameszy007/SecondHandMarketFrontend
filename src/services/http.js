import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true, // 若后端用 Cookie-Session
});

// 请求拦截：带上 token（若使用 JWT）
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 统一错误处理（可按需扩展）
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    // 401 统一跳登录
    if (status === 401) {
      // 可根据项目情况记录 from 并跳转
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default http;
