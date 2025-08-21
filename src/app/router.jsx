// src/app/router.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login"; // placeholder
import Register from "../pages/Auth/Register"; // placeholder
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* 示例：受保护路由 */}
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <div>Profile Page</div>
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
