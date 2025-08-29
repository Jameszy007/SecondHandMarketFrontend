import React, { useState, useEffect } from "react";
import { List, Card, Image, Tag, Typography, Space, Empty, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { getUserPosts, deletePost, updatePostStatus } from "../utils/postsStorage";

const { Text, Title } = Typography;

export default function UserPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user's posts from storage
  useEffect(() => {
    if (user) {
      const userPosts = getUserPosts(user.id);
      setPosts(userPosts);
      setLoading(false);
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [user]);

  const handleDeletePost = (postId) => {
    deletePost(postId);
    setPosts(getUserPosts(user.id));
    message.success("Post deleted successfully!");
  };

  const handleStatusChange = (postId, newStatus) => {
    updatePostStatus(postId, newStatus);
    setPosts(getUserPosts(user.id));
    message.success(`Post status updated to ${newStatus === 'sold' ? 'Sold' : 'On Sale'}!`);
  };

  const getStatusTag = (status) => {
    if (status === "sold") {
      return <Tag color="red">Sold</Tag>;
    } else if (status === "on_sale") {
      return <Tag color="green">On Sale</Tag>;
    }
    return <Tag color="default">Unknown</Tag>;
  };

  const getStatusButton = (post) => {
    if (post.status === "on_sale") {
      return (
        <Button 
          size="small" 
          type="primary" 
          danger
          onClick={() => handleStatusChange(post.id, "sold")}
        >
          Mark as Sold
        </Button>
      );
    } else {
      return (
        <Button 
          size="small" 
          type="primary"
          onClick={() => handleStatusChange(post.id, "on_sale")}
        >
          Mark for Sale
        </Button>
      );
    }
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
        <p className="mt-2">Loading your posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Empty
        description="No posts yet"
        style={{ margin: "40px 0" }}
      >
        <Text type="secondary">Start selling by creating your first post!</Text>
      </Empty>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Title level={4} style={{ margin: 0 }}>
          My Posts ({posts.length})
        </Title>
        <Text type="secondary">
          Showing all your listings
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
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card
              hoverable
              style={{ height: "100%" }}
              bodyStyle={{ padding: "12px" }}
            >
              <div className="d-flex">
                <Image
                  src={post.image}
                  alt={post.name}
                  width={80}
                  height={80}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  fallback="https://placehold.co/80x80?text=No+Image"
                />
                <div className="ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Text strong style={{ fontSize: "14px", lineHeight: "1.2" }}>
                        {post.itemName || post.name}
                      </Text>
                      <div className="mt-1">
                        <Text type="danger" style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {formatPrice(post.price)}
                        </Text>
                      </div>
                      <div className="mt-1">
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          Posted: {formatDate(post.createdAt)}
                        </Text>
                      </div>
                      <div className="mt-1">
                        <Text 
                          type={post.stockQuantity > 0 ? "success" : "danger"} 
                          style={{ fontSize: "12px", fontWeight: "bold" }}
                        >
                          Stock: {post.stockQuantity > 0 ? `${post.stockQuantity} available` : "Out of stock"}
                        </Text>
                      </div>
                      {post.deliveryMethod && (
                        <div className="mt-1">
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            Delivery: {post.deliveryMethod === 'meetup' ? 'Meetup' : 'Delivery'}
                          </Text>
                        </div>
                      )}
                    </div>
                    <div className="d-flex flex-column align-items-end">
                      {getStatusTag(post.status)}
                      <Space className="mt-2" size="small">
                        {getStatusButton(post)}
                        <Button 
                          size="small" 
                          type="text" 
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeletePost(post.id)}
                        />
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
