import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";

import Home from "../pages/Home/HomePage.jsx";
import Listing from "../pages/Listing/ListingPage.jsx";
import Detail from "../pages/Detail/DetailPage.jsx";
import Login from "../pages/Auth/LoginPage.jsx";
import Profile from "../pages/Profile/ProfilePage.jsx";
import ReviewPage from "../pages/Review/ReviewPage.jsx";
import UploadReviewPage from "../pages/Review/UploadReviewPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "items", element: <Listing /> },
      { path: "items/:id", element: <Detail /> },
      { path: "login", element: <Login /> },
      { path: "profile/:tab", element: <Profile /> },
      { path: "profile", element: <Profile /> },
      { path: "reviews", element: <ReviewPage /> },
      { path: "reviews/upload", element: <UploadReviewPage /> },
      { path: "posting", element: <PostingPage /> },
    ],
  },
]);

export default router;
