import React from "react";
import { useState, useEffect } from "react";
import { List, Avatar, Typography, Image, Space, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import {
  dummyReviews,
  getDummyUserById,
  getMockItemById,
} from "../../service/mockData";

const { Title, Text, Paragraph } = Typography;

const ReviewRow = ({ review }) => {
  const [item, setItem] = useState(null);
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItemDetail();
    fetchUserDetail();
  }, [review.itemId, review.buyerId]);

  const fetchItemDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Since backend is not ready, directly use Mock data
      // This avoids the "Invalid API response" error
      const itemData = getMockItemById(review.itemId);
      if (itemData) {
        setItem(itemData);
        setLoading(false);
      } else {
        setError("Item not found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch item details:", error);
      setError("Failed to load item details");
      setLoading(false);
    }
  };

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = getDummyUserById(review.buyerId);
      if (userData) {
        setBuyer(userData);
        setLoading(false);
      } else {
        setError("user not found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch item details:", error);
      setError("Failed to load item details");
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/items/${review.itemId}`);
  };

  return (
    <List.Item
      style={{
        border: "1px solid #f0f0f0",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div
          style={{ width: "150px", textAlign: "center", marginRight: "20px" }}
        >
          <Avatar size={64} src={buyer?.photo} />
          <Text strong style={{ display: "block", marginTop: "10px" }}>
            {buyer?.name}
          </Text>
          <Text type="secondary">{buyer?.location}</Text>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space>
              <Rate disabled defaultValue={review.rating} />
              <Text type="secondary">{review.postedTime}</Text>
            </Space>
          </div>
          <Paragraph style={{ marginTop: "10px" }}>{review.review}</Paragraph>
          <div style={{ marginTop: "20px" }}>
            <Text strong>Purchased Item:</Text>
            <div
              style={{ marginTop: "10px", cursor: "pointer" }}
              onClick={handleItemClick}
            >
              <Image width={100} src={item?.images[0]} preview={false} />
              <Text style={{ display: "block", marginTop: "5px" }}>
                {item?.title}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </List.Item>
  );
};

const ReviewPage = () => {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        Customer Reviews
      </Title>
      <List
        itemLayout="vertical"
        dataSource={dummyReviews}
        renderItem={(review) => <ReviewRow review={review} />}
        split={false}
      />
    </div>
  );
};

export default ReviewPage;
