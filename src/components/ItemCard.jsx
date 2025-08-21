import React from "react";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function ItemCard({ item }) {
  const nav = useNavigate();
  return (
    <Card
      hoverable
      onClick={() => nav(`/detail/${item.id}`)}
      cover={
        <img
          alt={item.title}
          src={item.cover || "https://via.placeholder.com/400x300?text=Item"}
          style={{ height: 160, objectFit: "cover" }}
        />
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text ellipsis style={{ maxWidth: 180 }}>{item.title}</Text>
        <Text strong>${item.price?.toFixed?.(2) ?? item.price}</Text>
      </div>
    </Card>
  );
}
