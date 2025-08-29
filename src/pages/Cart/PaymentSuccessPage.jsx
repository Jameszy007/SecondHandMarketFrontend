import React from "react";
import { Layout, Result, Card, Space, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

export function PaymentSuccessPage() {
    const navigate = useNavigate();

    const handleGoHome = () => {
      navigate("/");
    };

    return (
      <Layout style={{ minHeight: "100vh", background: "#f6ffed" }}>
        <Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card style={{ maxWidth: 520, width: "92%", textAlign: "center" }}>
            <Result status="success" title={<Title level={2} style={{ color: "#389e0d", margin: 0 }}>Success!</Title>} subTitle="Your payment has been completed. Thank you for your purchase!" />
            <Space>
              <Button type="primary" onClick={handleGoHome}>Go back to homepage</Button>
            </Space>
          </Card>
        </Content>
      </Layout>
    );
}