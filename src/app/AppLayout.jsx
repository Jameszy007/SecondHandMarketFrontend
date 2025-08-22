// src/app/AppLayout.jsx
import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HomeBar from "../components/HomeBar";

export default function AppLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HomeBar appName="XXX Second Hand Market App" /> {/* 不传 actions */}
      <Layout.Content style={{ padding: 16 }}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}
