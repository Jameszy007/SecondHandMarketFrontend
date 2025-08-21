import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ReviewPage from "../../pages/Review/ReviewPage";

export default function Profile() {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "favorites");

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    } else {
      navigate("/profile/favorites");
    }
  }, [tab, navigate]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    navigate(`/profile/${tabName}`);
  };

  const name = "name placeholder";
  const location = "location placeholder";
  const pfpUrl = "";

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
              activeTab === "favorites" ? "active show" : ""
            }`}
          >
            <h4>Favorites</h4>
            <p>Your favorite items will be displayed here.</p>
          </div>
          <div
            className={`tab-pane ${
              activeTab === "transactions" ? "active show" : ""
            }`}
          >
            <h4>Transactions</h4>
            <p>Your transaction history will be displayed here.</p>
          </div>
          <div
            className={`tab-pane ${
              activeTab === "reviews" ? "active show" : ""
            }`}
          >
            <p>Hello from Reviews Tab!</p>
          </div>
        </div>
      </div>
    </div>
  );
}