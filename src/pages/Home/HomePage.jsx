import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Space,
  Card,
  List,
  Skeleton,
  Tag,
  Typography,
  message,
  Badge,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ItemCard from "../../components/ItemCard";
import ReviewRow from "../../components/ReviewRow";
import { CATEGORIES, SKELETON_ITEM_COUNT } from "../../utils/constants";
import { dummyReviews, mockItems, getMockItemList } from "../../utils/mockData";
import { useAuth } from "../../hooks/useAuth";

const { Title } = Typography;
const { Search } = Input;
const item = mockItems;
const mockReviews = dummyReviews;

export default function HomePage() {
  console.log("HomePage component rendering");
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { isAuthenticated } = useAuth();

  // 拉最新商品 + 部分评价
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);

        if (!mounted) return;
        
        // Get latest items including user posts
        const latestItems = getMockItemList({ limit: 8, sort: "date-desc" });
        setItems(latestItems.items);
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
    nav(`/items?keyword=${encodeURIComponent(keyword)}`);
  };

  // 分类点击
  const onCategoryClick = (key) => {
    nav(`/items?category=${key}`);
  };

  // F/C 按钮（放在搜索条右边）
  const ActionButtons = useMemo(() => {
    const authNav = (to) => {
      if (isAuthenticated) {
        nav(to);
      } else {
        nav("/login", { state: { from: to } });
      }
    };
    return (
      <Space>
        <Tooltip title="Favorites">
          <Button
            shape="circle"
            icon={<HeartOutlined />}
            onClick={() => authNav("/profile/favorites")}
          />
        </Tooltip>
        <Tooltip title="Cart">
          <Badge count={0} size="small">
            <Button
              shape="circle"
              icon={<ShoppingCartOutlined />}
              onClick={() => authNav("/cart")}
            />
          </Badge>
        </Tooltip>
      </Space>
    );
  }, [isAuthenticated, nav]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {/* 标题行（可选） */}
      <Row style={{ marginBottom: 12 }}>
        <Col span={24}>
          <Title level={4} style={{ margin: 0 }}>
            Welcome to LaiCai Second Hand Market
          </Title>
        </Col>
      </Row>

      {/* 搜索区 + F/C */}
      <Card style={{ marginBottom: 12 }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={18}>
            <Search
              placeholder="Search"
              allowClear
              enterButton
              onSearch={onSearch}
            />
          </Col>
          <Col
            xs={24}
            md={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {ActionButtons}
          </Col>
        </Row>
      </Card>

      {/* 分类入口 */}
      <Card style={{ marginBottom: 12 }}>
        <Space wrap size={[8, 8]}>
          {CATEGORIES.map((c) => (
            <Tag
              key={c.key}
              color="blue"
              style={{ cursor: "pointer" }}
              onClick={() => onCategoryClick(c.key)}
            >
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
          <>
            <Row gutter={[12, 12]}>
              {items.slice(0, 8).map((item) => (
                <Col xs={12} sm={8} md={6} lg={6} key={item.id}>
                  <ItemCard item={item} />
                </Col>
              ))}
            </Row>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={() => nav("/items")}>
                More
              </Button>
            </div>
          </>
        )}
      </Card>

      {/* 近期 Review（简要列表） */}
      <Card title="Recent Reviews">
        <List
          dataSource={reviews.slice(0, 3)}
          renderItem={(rv) => <ReviewRow review={rv} />}
          locale={{ emptyText: loading ? " " : "No reviews yet" }}
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" onClick={() => nav("/reviews")}>
            More
          </Button>
        </div>
      </Card>
    </div>
  );
}
