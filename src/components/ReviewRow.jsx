import React from "react";
import { Avatar, Typography, Space, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

export default function ReviewRow({ review }) {
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (review.itemId) {
      navigate(`/items/${review.itemId}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
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
          <Avatar size={64} src={review.userAvatar} />
          <Text strong style={{ display: "block", marginTop: "10px" }}>
            {review.username}
          </Text>
          <Text type="secondary">User</Text>
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
              <Text type="secondary">{formatDate(review.createdAt)}</Text>
            </Space>
          </div>
          <Paragraph style={{ marginTop: "10px" }}>{review.review}</Paragraph>
          
          {/* Item Information - Only Name, No Picture */}
          {review.itemTitle && (
            <div style={{ marginTop: "20px" }}>
              <Text strong>Item: </Text>
              <Tag 
                color="blue" 
                style={{ cursor: "pointer" }}
                onClick={handleItemClick}
              >
                {review.itemTitle}
              </Tag>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
