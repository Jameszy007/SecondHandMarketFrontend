import React, { useState, useRef } from "react";
import { Form, Input, Button, Rate, message } from "antd";
import reviewAPI from "../../service/api.js";

export default function UploadReview() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const { files } = fileInputRef.current;

    if (!files || files.length === 0) {
      message.error("Please upload at least one picture.");
      return;
    }

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    formData.append("rating", values.rating);
    formData.append("review", values.review);

    setLoading(true);
    try {
      await reviewAPI.uploadReview(formData);
      message.success("Review uploaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Failed to upload review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4" style={{ width: "500px" }}>
        <h2 className="text-center mb-4">Upload Your Review</h2>

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
            <Input.TextArea rows={4} placeholder="Write your review here..." />
          </Form.Item>

          <Form.Item
            name="pictures"
            label="Upload Pictures"
            rules={[
              { required: true, message: "Please upload at least one picture" },
            ]}
          >
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              multiple
              className="form-control"
            />
            <small className="text-muted">You can upload up to 5 images.</small>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-100"
              loading={loading}
            >
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
