import React from "react";
import { Avatar, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function ReviewRow({ review }) {
  const nav = useNavigate();
  return (
    <List.Item
      style={{ padding: "8px 0", cursor: "pointer" }}
      onClick={() => nav(`/detail/${review.itemId}`)}
    >
      <List.Item.Meta
        avatar={<Avatar src={review.userAvatar} onClick={(e)=>{e.stopPropagation(); nav(`/profile/${review.userId}`);}} />}
        title={<Text strong>{review.userName}</Text>}
        description={<Text type="secondary">{review.content}</Text>}
      />
    </List.Item>
  );
}
