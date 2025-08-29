import React, { useState, useRef } from "react";
import { Form, Input, Button, Rate, message, Card, Typography, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { addReview } from "../../utils/reviewsStorage";
import { useNavigate, useLocation } from "react-router-dom";

const { Title } = Typography;

export default function UploadReview() {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get item information from navigation state
  const itemInfo = location.state;

  const handleSubmit = async (values) => {
    if (!user) {
      message.error("Please log in to submit a review");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const reviewData = {
        userId: user.id,
        username: user.username,
        rating: values.rating,
        review: values.review,
        itemId: itemInfo?.itemId || null,
        itemTitle: itemInfo?.itemTitle || "General Review",
        images: fileList.map(file => file.url || file.thumbUrl || file.name)
      };

      addReview(reviewData);
      message.success("Review submitted successfully!");
      setTimeout(() => {
        navigate("/reviews");
      }, 1000);
    } catch (error) {
      console.error(error);
      message.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "0 20px" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Submit Your Review
          {itemInfo?.itemTitle && (
            <div style={{ fontSize: "16px", color: "#666", marginTop: "8px" }}>
              for "{itemInfo.itemTitle}"
            </div>
          )}
        </Title>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="review"
            label="Review"
            rules={[{ required: true, message: "Please write your review" }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Write your review here..." 
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="pictures"
            label="Upload Pictures (Optional)"
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={5}
              accept="image/*"
            >
              {fileList.length < 5 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
              You can upload up to 5 images (optional)
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{ width: "100%" }}
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
