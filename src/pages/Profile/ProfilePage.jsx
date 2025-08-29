import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewPage from "../../pages/Review/ReviewPage";
import TransactionPage from "../Transaction/TransactionPage";
import UserPosts from "../../components/UserPosts";
import UserFavorites from "../../components/UserFavorites";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(tab || "favorites");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    } else {
      navigate("/profile/posts");
    }
  }, [tab, navigate]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    navigate(`/profile/${tabName}`);
  };

  // Use actual user data or fallback to placeholders
  const name = user?.username || "name placeholder";
  const location = user?.location || "location placeholder";
  const pfpUrl = user?.avatar || "";

  return (
    <div className="container h-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 w-100">
        <div className="d-flex align-items-center">
          <img
            src={pfpUrl ? pfpUrl : "https://placehold.co/128x128"}
            className="rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
          <div className="ms-4">
            <h2>{name}</h2>
            <p className="text-secondary">{location}</p>
          </div>
        </div>
        <hr />
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "posts" ? "active" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("posts")}
            >
              Posts
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "favorites" ? "active" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("favorites")}
            >
              Favorites
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                activeTab === "transactions" ? "active" : ""
              }`}
              href="#"
              onClick={() => handleTabClick("transactions")}
            >
              Transactions
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
              href="#"
              onClick={() => handleTabClick("reviews")}
            >
              Reviews
            </a>
          </li>
        </ul>
        <div className="tab-content p-4">
          <div
            className={`tab-pane ${
              activeTab === "posts" ? "active show" : ""
            }`}
          >
            <UserPosts />
          </div>
          <div
            className={`tab-pane ${
              activeTab === "favorites" ? "active show" : ""
            }`}
          >
            <UserFavorites />
          </div>
          <div
            className={`tab-pane ${
              activeTab === "transactions" ? "active show" : ""
            }`}
          >
            <h4>Transactions</h4>
            <TransactionPage />
          </div>
          <div
            className={`tab-pane ${
              activeTab === "reviews" ? "active show" : ""
            }`}
          >
            <ReviewPage />
          </div>
        </div>
      </div>
    </div>
  );
}
