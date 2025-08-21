import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Input, Button, Space, Card, List, Skeleton, Tag, Typography, message, Badge, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import { homeApi } from "../../services/api";
import ItemCard from "../../components/ItemCard";
import ReviewRow from "../../components/ReviewRow";
import { CATEGORIES, SKELETON_ITEM_COUNT } from "../../utils/constants";

const { Title } = Typography;
const { Search } = Input;

function useAuthed() {
  return Boolean(localStorage.getItem("token"));
}

export default function HomePage() {
  console.log("HomePage component rendering");
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const authed = useAuthed();

  // 拉最新商品 + 部分评价
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        // For now, use mock data since backend is not available
        const mockItems = [
          {
            id: 1,
            title: "iPhone 12 Pro",
            price: 599.99,
            cover: "https://via.placeholder.com/400x300?text=iPhone+12+Pro"
          },
          {
            id: 2,
            title: "MacBook Air M1",
            price: 899.99,
            cover: "https://via.placeholder.com/400x300?text=MacBook+Air"
          },
          {
            id: 3,
            title: "Nike Air Max",
            price: 129.99,
            cover: "https://via.placeholder.com/400x300?text=Nike+Shoes"
          },
          {
            id: 4,
            title: "Sony Headphones",
            price: 199.99,
            cover: "https://via.placeholder.com/400x300?text=Sony+Headphones"
          }
        ];
        
        const mockReviews = [
          {
            id: 1,
            itemId: 1,
            userId: 1,
            userName: "John Doe",
            userAvatar: "https://via.placeholder.com/40x40?text=JD",
            content: "Great condition, exactly as described!"
          },
          {
            id: 2,
            itemId: 2,
            userId: 2,
            userName: "Jane Smith",
            userAvatar: "https://via.placeholder.com/40x40?text=JS",
            content: "Fast shipping and excellent quality."
          }
        ];
        
        if (!mounted) return;
        setItems(mockItems);
        setReviews(mockReviews);
      } catch (e) {
        console.error("Error loading data:", e);
        message.error("Failed to load homepage data");
        // Set empty arrays to prevent crashes
        setItems([]);
        setReviews([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  // 搜索
  const onSearch = (kw) => {
    const keyword = (kw || "").trim();
    if (!keyword) return;
    nav(`/listing?keyword=${encodeURIComponent(keyword)}`);
  };

  // 分类点击
  const onCategoryClick = (key) => {
    nav(`/listing?category=${key}`);
  };

  // F/C/S 按钮（放在搜索条右边）
  const ActionButtons = useMemo(() => {
    const authNav = (to) => {
      if (authed) nav(to);
      else nav("/login", { state: { from: "/" } });
    };
    return (
      <Space>
        <Tooltip title="Favorites">
          <Button shape="circle" icon={<HeartOutlined />} onClick={() => authNav("/favorites")} />
        </Tooltip>
        <Tooltip title="Cart">
          <Badge count={0} size="small">
            <Button shape="circle" icon={<ShoppingCartOutlined />} onClick={() => authNav("/cart")} />
          </Badge>
        </Tooltip>
        <Tooltip title="Post Item">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => authNav("/posting")} />
        </Tooltip>
      </Space>
    );
  }, [authed, nav]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {/* 标题行（可选） */}
      <Row style={{ marginBottom: 12 }}>
        <Col span={24}>
          <Title level={4} style={{ margin: 0 }}>Welcome to XXX Second Hand Market</Title>
        </Col>
      </Row>

      {/* 搜索区 + F/C/S */}
      <Card style={{ marginBottom: 12 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={18}>
            <Search placeholder="Search" allowClear enterButton onSearch={onSearch} />
          </Col>
          <Col xs={24} md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
            {ActionButtons}
          </Col>
        </Row>
      </Card>

      {/* 分类入口 */}
      <Card style={{ marginBottom: 12 }}>
        <Space wrap size={[8, 8]}>
          {CATEGORIES.map((c) => (
            <Tag key={c.key} color="blue" style={{ cursor: "pointer" }} onClick={() => onCategoryClick(c.key)}>
              {c.name}
            </Tag>
          ))}
        </Space>
      </Card>

      {/* 最新商品网格 */}
      <Card title="Newest Items" style={{ marginBottom: 12 }}>
        {loading ? (
          <Row gutter={[12, 12]}>
            {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
              <Col xs={12} sm={8} md={6} lg={6} key={i}>
                <Skeleton.Image style={{ width: "100%", height: 160 }} active />
                <Skeleton active paragraph={{ rows: 1 }} />
              </Col>
            ))}
          </Row>
        ) : (
          <Row gutter={[12, 12]}>
            {items.map((item) => (
              <Col xs={12} sm={8} md={6} lg={6} key={item.id}>
                <ItemCard item={item} />
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* 近期 Review（简要列表） */}
      <Card title="Recent Reviews">
        <List
          dataSource={reviews}
          renderItem={(rv) => <ReviewRow review={rv} />}
          locale={{ emptyText: loading ? " " : "No reviews yet" }}
        />
      </Card>
    </div>
  );
}
