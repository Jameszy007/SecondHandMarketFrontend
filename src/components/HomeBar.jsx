import React from "react";
import { Layout, Button, Space, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const { Header } = Layout;

export default function HomeBar({ appName = "LaiCai Second Hand Market" }) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreatePost = () => {
    if (isAuthenticated) {
      navigate("/posting");
    } else {
      navigate("/login", { state: { from: "/posting" } });
    }
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
      onClick: () => navigate("/profile"),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#fff",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#1890ff",
        }}
        onClick={() => navigate("/")}
      >
        {appName}
      </div>

      <Space>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleCreatePost}
        >
          Create Post
        </Button>
        
        {isAuthenticated ? (
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            arrow
          >
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Dropdown>
        ) : (
          <Space>
            <Button type="link" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Register
            </Button>
          </Space>
        )}
      </Space>
    </Header>
  );
}
