// src/app/router.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "../pages/Home/HomePage";
import Login from "../pages/Auth/LoginPage";
import Listing from "../pages/Listing/ListingPage";
import Detail from "../pages/Detail/DetailPage";
import Review from "../pages/Review/ReviewPage";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile/ProfilePage";
import UploadReview from "../pages/Review/UploadReviewPage";
import Transaction from "../pages/Transaction/TransactionPage";
import Chat from "../pages/Chat/ChatPage";
import ShoppingCartPage from "../pages/Cart/ShoppingCartPage";
import { PaymentSuccessPage } from "../pages/Cart/PaymentSuccessPage";
import PostingPage from "../pages/Posting/PostingPage";
import SettingsPage from "../pages/Settings/SettingsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Login />} />
          <Route path="profile/:tab" element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="posts" element={<Profile />} />
          <Route path="items" element={<Listing />} />
          <Route path="reviews" element={<Review />} />
          <Route path="reviews/upload" element={<UploadReview />} />
          <Route path="items/:id" element={<Detail />} />
          <Route path="chat" element={<Chat />} />
          <Route path="cart" element={<ShoppingCartPage/>} />
          <Route path="success" element={<PaymentSuccessPage />} />
          <Route path="posting" element={<PostingPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* 示例：受保护路由 */}
          <Route
            path="profile"
            // element={
            //   <PrivateRoute>
            //     <div>Profile Page</div>
            //   </PrivateRoute>
            // }
            element={<Profile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
