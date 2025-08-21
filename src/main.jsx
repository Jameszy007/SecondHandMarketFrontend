// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
// Ant Design CSS is imported automatically in newer versions

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: "#1890ff" } }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
