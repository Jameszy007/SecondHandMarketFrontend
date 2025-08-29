import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Divider,
  Typography,
  Space,
  Row,
  Col,
  message,
  Avatar,
  Upload,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";

const { Title, Text } = Typography;

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  // Mock user data - in real app this would come from API
  const [userData, setUserData] = useState({
    username: user?.username || "testuser",
    email: user?.email || "test@example.com",
    phone: "123-456-7890",
    location: "New York, NY",
    bio: "I love buying and selling second-hand items!",
  });

  // Update userData when user changes
  useEffect(() => {
    if (user) {
      setUserData(prev => ({
        ...prev,
        username: user.username || prev.username,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  const handleProfileUpdate = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUserData(prev => ({ ...prev, ...values }));
      message.success("Profile updated successfully!");
      setLoading(false);
    }, 1000);
  };

  const handlePasswordChange = (values) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success("Password changed successfully!");
      setLoading(false);
    }, 1000);
  };



  const handleLogout = () => {
    logout();
    message.success("Logged out successfully!");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px" }}>
      <Title level={2}>Settings</Title>
      
      <Row gutter={[24, 24]}>
        {/* Profile Settings */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <UserOutlined />
                Profile Settings
              </Space>
            }
          >
            <Form
              layout="vertical"
              initialValues={userData}
              onFinish={handleProfileUpdate}
            >
              <Form.Item label="Profile Picture">
                <Space direction="vertical" align="center">
                  <Avatar size={80} src={userData.avatar} icon={<UserOutlined />} />
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Space>
              </Form.Item>

              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please input username!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="phone" label="Phone Number">
                <Input />
              </Form.Item>

              <Form.Item name="location" label="Location">
                <Input />
              </Form.Item>

              <Form.Item name="bio" label="Bio">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Security Settings */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <LockOutlined />
                Security Settings
              </Space>
            }
          >
            <Form layout="vertical" onFinish={handlePasswordChange}>
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: "Please input current password!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: "Please input new password!" },
                  { min: 6, message: "Password must be at least 6 characters!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={["newPassword"]}
                rules={[
                  { required: true, message: "Please confirm password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords don't match!"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Change Password
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Space direction="vertical" style={{ width: "100%" }}>
              <Text strong>Account Actions</Text>
              <Button danger onClick={handleLogout}>
                Logout
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
