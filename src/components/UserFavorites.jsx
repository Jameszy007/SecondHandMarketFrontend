import React, { useState, useEffect } from "react";
import { List, Card, Image, Typography, Empty, Button, message, Popconfirm, Space } from "antd";
import { HeartOutlined, HeartFilled, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loadFavorites, removeFromFavorites } from "../utils/favoritesStorage";

const { Text, Title } = Typography;

export default function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load favorites from localStorage
    const loadFavoritesData = () => {
      try {
        const favoritesData = loadFavorites();
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error loading favorites:", error);
        message.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavoritesData();
  }, []);

  const handleRemoveFavorite = (itemId) => {
    try {
      const updatedFavorites = removeFromFavorites(itemId);
      setFavorites(updatedFavorites);
      message.success("Removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
      message.error("Failed to remove from favorites");
    }
  };

  const handleViewItem = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <Empty
        description="No favorites yet"
        style={{ margin: "40px 0" }}
      >
        <Text type="secondary">Start browsing and add items to your favorites!</Text>
        <div style={{ marginTop: "16px" }}>
          <Button type="primary" onClick={() => navigate("/items")}>
            Browse Items
          </Button>
        </div>
      </Empty>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Title level={4} style={{ margin: 0 }}>
          My Favorites ({favorites.length})
        </Title>
        <Text type="secondary">
          Items you've liked
        </Text>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={favorites}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              style={{ height: "100%" }}
              bodyStyle={{ padding: "12px" }}
            >
              <div className="d-flex">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  fallback="https://placehold.co/80x80?text=No+Image"
                />
                <div className="ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Text strong style={{ fontSize: "14px", lineHeight: "1.2" }}>
                        {item.name}
                      </Text>
                      <div className="mt-1">
                        <Text type="danger" style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {formatPrice(item.price)}
                        </Text>
                      </div>
                      <div className="mt-1">
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          Added: {formatDate(item.createdAt)}
                        </Text>
                      </div>
                      {item.category && (
                        <div className="mt-1">
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Category: {item.category}
                          </Text>
                        </div>
                      )}
                    </div>
                    <div>
                      <HeartFilled style={{ color: "#e74c3c", fontSize: "16px" }} />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => handleViewItem(item.id)}
                  >
                    View Details
                  </Button>
                </Space>
                
                <Popconfirm
                  title="Remove from favorites"
                  description="Are you sure you want to remove this item from your favorites?"
                  onConfirm={() => handleRemoveFavorite(item.id)}
                  okText="Yes"
                  cancelText="No"
                  placement="top"
                >
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<HeartFilled />}
                  >
                    Unfavorite
                  </Button>
                </Popconfirm>
                            </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
