import React, { useState, useEffect } from "react";
import { Button, Card, Input, Select, Checkbox, Upload, Tag, Space, Form, message } from "antd";
import { PlusOutlined, CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { addPost } from "../../utils/postsStorage";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export default function PostingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    stockQuantity: 1,
    photos: [],
    pickupLocation: "",
    deliveryMethods: [],
    email: user?.email || "default@email.com",
    phone: "123-456-7890",
    tags: [],
    newTag: "",
  });

  // Update email when user changes
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const handleFileChange = (info) => {
    try {
      const files = info.fileList.slice(0, 6);
      setFormData({ ...formData, photos: files });
    } catch (error) {
      console.error("Error handling file change:", error);
      message.error("Error uploading files");
    }
  };

  const handleDeliveryToggle = (method) => {
    setFormData((prev) => {
      const exists = prev.deliveryMethods.includes(method);
      return {
        ...prev,
        deliveryMethods: exists
          ? prev.deliveryMethods.filter((m) => m !== method)
          : [...prev.deliveryMethods, method],
      };
    });
  };

  const handleAddTag = () => {
    if (formData.newTag.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: "",
      }));
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (values) => {
    try {
      // Convert price values to numbers for consistency
      const submitData = { 
        ...formData, 
        ...values,
        price: values.price ? parseFloat(values.price) : null,
        originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : null
      };
      console.log("Submitted Data:", submitData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
             // Save the post to storage
       const newPost = addPost({
         userId: user?.id || 1,
         title: submitData.itemName,
         description: submitData.description,
         price: submitData.price,
         originalPrice: submitData.originalPrice,
         stockQuantity: submitData.stockQuantity || 1,
         category: submitData.category,
         condition: submitData.condition,
         pickupLocation: submitData.pickupLocation,
         deliveryMethods: submitData.deliveryMethods,
         email: submitData.email,
         phone: submitData.phone,
         tags: submitData.tags,
         photos: submitData.photos,
         seller: {
           id: user?.id || 1,
           name: user?.username || "Unknown User",
           avatar: user?.avatar || "https://placehold.co/128x128",
           rating: 4.5,
           totalSales: 0
         },
         location: submitData.pickupLocation,
         views: 0,
         likes: 0
       });
      
      console.log("New post saved:", newPost);
      message.success("Post uploaded successfully! Redirecting to your profile...");
      
      // Reset form
      form.resetFields();
      setFormData({
        itemName: "",
        description: "",
        category: "",
        condition: "",
        price: "",
        originalPrice: "",
        stockQuantity: 1,
        photos: [],
        pickupLocation: "",
        deliveryMethods: [],
        email: user?.email || "default@email.com",
        phone: "123-456-7890",
        tags: [],
        newTag: "",
      });
      
      // Navigate to profile page after a short delay to show the success message
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to upload post. Please try again.");
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: handleFileChange,
    multiple: true,
    accept: "image/*",
    fileList: formData.photos,
    onPreview: (file) => {
      console.log("Preview file:", file);
    },
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a Post</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
          initialValues={{
            email: user?.email || "default@email.com",
            phone: "123-456-7890"
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <Form.Item
                name="itemName"
                label="Item Name"
                rules={[{ required: true, message: "Please enter item name!" }]}
              >
                <Input placeholder="Item name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter description!" }]}
              >
                <TextArea rows={4} placeholder="Description" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select placeholder="Select category">
                  <Option value="electronics">Electronics</Option>
                  <Option value="furniture">Furniture</Option>
                  <Option value="clothing">Clothing</Option>
                  <Option value="books">Books</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="condition"
                label="Condition"
                rules={[{ required: true, message: "Please select condition!" }]}
              >
                <Select placeholder="Select condition">
                  <Option value="new">New</Option>
                  <Option value="like-new">Like New</Option>
                  <Option value="used">Used</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="price"
                label="Price (USD)"
                rules={[
                  { required: true, message: "Please enter price!" },
                  {
                    validator: (_, value) => {
                      if (value === undefined || value === '') {
                        return Promise.resolve();
                      }
                      const numValue = parseFloat(value);
                      if (isNaN(numValue) || numValue <= 0) {
                        return Promise.reject(new Error('Price must be a positive number!'));
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input type="number" placeholder="Price (USD)" min="0" step="0.01" />
              </Form.Item>

                             <Form.Item
                 name="originalPrice"
                 label="Original Price (USD)"
                 rules={[
                   {
                     validator: (_, value) => {
                       if (value === undefined || value === '') {
                         return Promise.resolve();
                       }
                       const numValue = parseFloat(value);
                       if (isNaN(numValue) || numValue <= 0) {
                         return Promise.reject(new Error('Original price must be a positive number!'));
                       }
                       return Promise.resolve();
                     }
                   }
                 ]}
               >
                 <Input type="number" placeholder="Original Price (USD)" min="0" step="0.01" />
               </Form.Item>

               <Form.Item
                 name="stockQuantity"
                 label="Stock Quantity"
                 rules={[
                   { required: true, message: "Please enter stock quantity!" },
                   {
                     validator: (_, value) => {
                       if (value === undefined || value === '') {
                         return Promise.resolve();
                       }
                       const numValue = parseInt(value);
                       if (isNaN(numValue) || numValue <= 0) {
                         return Promise.reject(new Error('Stock quantity must be a positive integer!'));
                       }
                       return Promise.resolve();
                     }
                   }
                 ]}
               >
                 <Input type="number" placeholder="Stock Quantity" min="1" step="1" />
               </Form.Item>

              <Form.Item
                name="photos"
                label="Photos"
              >
                <Upload {...uploadProps} listType="picture-card">
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
                <p className="text-xs text-gray-500 mt-2">Max 6 photos allowed</p>
              </Form.Item>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <Form.Item
                name="pickupLocation"
                label="Pickup Location"
                rules={[{ required: true, message: "Please select pickup location!" }]}
              >
                <Select placeholder="Pickup location">
                  <Option value="newyork">New York</Option>
                  <Option value="losangeles">Los Angeles</Option>
                  <Option value="chicago">Chicago</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Delivery Method">
                <Space direction="vertical">
                  <Checkbox
                    checked={formData.deliveryMethods.includes("meetup")}
                    onChange={() => handleDeliveryToggle("meetup")}
                  >
                    Meet-up
                  </Checkbox>
                  <Checkbox
                    checked={formData.deliveryMethods.includes("delivery")}
                    onChange={() => handleDeliveryToggle("delivery")}
                  >
                    Delivery
                  </Checkbox>
                </Space>
              </Form.Item>

              <Form.Item label="Contact Information">
                <Input
                  type="email"
                  placeholder="Default email from profile"
                  value={formData.email}
                  readOnly
                />
                <Input
                  type="tel"
                  placeholder="Default number from profile"
                  value={formData.phone}
                  readOnly
                  className="mt-2"
                />
              </Form.Item>

              <Form.Item label="Tags">
                <div className="flex space-x-2 mb-2">
                  <Input
                    placeholder="Add a tag"
                    value={formData.newTag}
                    onChange={(e) =>
                      setFormData({ ...formData, newTag: e.target.value })
                    }
                    onPressEnter={handleAddTag}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Tag
                      key={index}
                      closable
                      onClose={() => handleRemoveTag(tag)}
                      color="blue"
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              </Form.Item>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <Button type="primary" htmlType="submit" size="large" className="w-40">
              Upload Post
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
