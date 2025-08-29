import React, { useMemo, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  List,
  Image,
  Typography,
  Space,
  Button,
  InputNumber,
  Divider,
  Popconfirm,
  Tag,
  Segmented,
  Form,
  Input,
  Radio,
  Statistic,
  Modal,
  Result,
  message,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  CreditCardOutlined,
  BankOutlined,
  PayCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { PaymentSuccessPage } from "./PaymentSuccessPage";
import { loadCart, saveCart } from "../../components/CartStorage";
import { addTransaction } from "../../utils/transactionStorage";
import { useAuth } from "../../hooks/useAuth";

const { Content } = Layout;
const { Title, Text } = Typography;

// ---------------------- Payment Form ----------------------
function PaymentForm({ method, values, onChange }) {
  if (method === "PayPal") {
    return (
      <Form layout="vertical">
        <Form.Item label="PayPal Email" required>
          <Input
            placeholder="you@example.com"
            value={values.paypalEmail || ""}
            onChange={(e) => onChange("paypalEmail", e.target.value)}
          />
        </Form.Item>
        <Button type="primary" icon={<PayCircleOutlined />}>Connect PayPal</Button>
      </Form>
    );
  }
  // Credit / Debit share same fields
  return (
    <Form layout="vertical">
      <Row gutter={12}>
        <Col span={24}>
          <Form.Item label={`${method} Card Number`} required>
            <Input
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={values.cardNumber || ""}
              onChange={(e) => onChange("cardNumber", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Name on Card" required>
            <Input
              placeholder="JASON ZHAO"
              value={values.cardName || ""}
              onChange={(e) => onChange("cardName", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Expiry" required>
            <Input
              placeholder="MM/YY"
              maxLength={5}
              value={values.expiry || ""}
              onChange={(e) => onChange("expiry", e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="CVV" required>
            <Input
              placeholder="3 digits"
              maxLength={3}
              value={values.cvv || ""}
              onChange={(e) => onChange("cvv", e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

// ---------------------- Item Row ----------------------
function ItemRow({ item, onInc, onDec, onRemove }) {
  const isAtMaxStock = item.qty >= (item.stockQuantity || 999);
  
  return (
    <List.Item
      actions={[
        <Space key="qty" size={0}>
          <Button icon={<MinusOutlined />} onClick={() => onDec(item.id)} />
          <InputNumber min={1} value={item.qty} readOnly style={{ width: 64 }} />
          <Button 
            icon={<PlusOutlined />} 
            onClick={() => onInc(item.id)}
            disabled={isAtMaxStock}
            title={isAtMaxStock ? `Maximum ${item.stockQuantity} items allowed` : "Add one more"}
          />
        </Space>,
        <Popconfirm title="Are you sure?" onConfirm={() => onRemove(item.id)} key="del">
          <Button danger icon={<DeleteOutlined />}>Delete</Button>
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        avatar={<Image src={item.img} width={80} height={80} style={{ objectFit: "cover", borderRadius: 8 }} />}
        title={
          <Space wrap>
            {item.tags?.map(t => <Tag key={t}>{t}</Tag>)}
            <Text strong>{item.title}</Text>
          </Space>
        }
        description={
          <Space direction="vertical" size={0}>
            <Text type="secondary">Price: ${item.price.toFixed(2)}</Text>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              Stock: {item.qty}/{item.stockQuantity || "∞"} 
              {isAtMaxStock && <Text type="warning" style={{ marginLeft: "8px" }}>(Max reached)</Text>}
            </Text>
          </Space>
        }
      />
    </List.Item>
  );
}

// ---------------------- Helpers ----------------------
function validatePayment(method, f) {
  if (method === "PayPal") {
    const ok = /.+@.+\..+/.test((f.paypalEmail || "").trim());
    return ok ? null : "Wrong email address format for PayPal";
  }
  // For card: 16 digits, expiry MM/YY, cvv 3 digits, name not empty
  const digits = (f.cardNumber || "").split(" ").join("");
  if (!/^[0-9]{16}$/.test(digits)) return "The credit card number must be 16 digits long";
  if (!/^[0-9]{2}\/[0-9]{2}$/.test(f.expiry || "")) return "Valid period format should be MM/YY";
  if (!/^[0-9]{3}$/.test(f.cvv || "")) return "CVV must contain 3 digits";
  if (!(f.cardName || "").trim()) return "Please enter the name";
  return null;
}

// ---------------------- Main Cart Page ----------------------
export default function ShoppingCartPage() {
  const [items, setItems] = useState(() => loadCart());
  const [method, setMethod] = useState("Credit");
  const [fulfill, setFulfill] = useState("pickup"); // pickup | delivery
  const [fields, setFields] = useState({});
  const [err, setErr] = useState({ visible: false, msg: "" });

  const nav = useNavigate();
  const { user } = useAuth();

  const onField = (k, v) => setFields((prev) => ({ ...prev, [k]: v }));

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + it.price * it.qty, 0),
    [items]
  );
  const deliveryFee = fulfill === "delivery" ? 10 : 0;
  const total = useMemo(() => +(subtotal + deliveryFee).toFixed(2), [subtotal, deliveryFee]);

  const inc = (id) => {
    setItems((prev) => {
      const item = prev.find((it) => it.id === String(id));
      if (!item) return prev;
      
      if (item.qty >= (item.stockQuantity || 999)) {
        message.warning(`Cannot add more than ${item.stockQuantity} items.`);
        return prev;
      }
      
      const next = prev.map((it) => it.id === String(id) ? { ...it, qty: it.qty + 1 } : it);
      saveCart(next);
      return next;
    });
  };

  const dec = (id) => {
    setItems((prev) => {
      const next = prev.map((it) =>
        it.id === String(id) ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      );
      saveCart(next);
      return next;
    });
  };

  const removeItem = (id) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== String(id));
      saveCart(next);
      return next;
    });
  };

  const checkout = () => {
    if (items.length === 0) return message.warning("Cart is empty");
    
    if (!user) {
      message.error("Please log in to complete payment");
      nav("/login", { state: { from: "/cart" } });
      return;
    }
    
    const errMsg = validatePayment(method, fields);
    if (errMsg) {
      setErr({ visible: true, msg: errMsg });
      return;
    }

    // Create transaction record
    const transaction = {
      userId: user.id,
      username: user.username,
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.qty,
        image: item.img
      })),
      paymentMethod: method,
      fulfillmentMethod: fulfill,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      paymentDetails: {
        cardNumber: method !== "PayPal" ? fields.cardNumber : null,
        cardName: method !== "PayPal" ? fields.cardName : null,
        paypalEmail: method === "PayPal" ? fields.paypalEmail : null
      }
    };

    // Add transaction to storage
    addTransaction(transaction);

    // Clear cart after successful payment
    saveCart([]);
    setItems([]);

    message.success(`Payment successful! Order submitted via ${method} · ${fulfill} · Total: $${total}`);
    nav("/success");
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content style={{ padding: 16 }}>
        <Row gutter={[24, 24]} style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Left: Items */}
          <Col xs={24} lg={16}>
            <Card title={<Space><ShoppingCartOutlined /> Cart</Space>}>
              <List
                itemLayout="horizontal"
                dataSource={items}
                locale={{ emptyText: "Empty" }}
                renderItem={(item) => (
                  <ItemRow key={item.id} item={item} onInc={inc} onDec={dec} onRemove={removeItem} />
                )}
              />
            </Card>
          </Col>

          {/* Right: Payment & Summary */}
          <Col xs={24} lg={8}>
            <Card
              title="Payment Details"
              style={{ position: "sticky", top: 16 }}
              extra={
                <Segmented
                  options={[
                    { label: "Credit", value: "Credit", icon: <CreditCardOutlined /> },
                    { label: "Debit", value: "Debit", icon: <BankOutlined /> },
                    { label: "PayPal", value: "PayPal", icon: <PayCircleOutlined /> },
                  ]}
                  value={method}
                  onChange={(v) => { setMethod(v); setFields({}); }}
                />
              }
            >
              {/* Payment Form changes by bar */}
              <PaymentForm method={method} values={fields} onChange={onField} />

              <Divider />

              {/* Fulfillment */}
              <Card size="small" title="Method" bordered={false} style={{ background: "#fafafa" }}>
                <Radio.Group value={fulfill} onChange={(e) => setFulfill(e.target.value)}>
                  <Space direction="vertical">
                    <Radio value="pickup">Pick up(Free)</Radio>
                    <Radio value="delivery">Delivery(+$10)</Radio>
                  </Space>
                </Radio.Group>
              </Card>

              <Divider style={{ margin: "12px 0" }} />

              {/* Summary */}
              <Space direction="vertical" style={{ width: "100%" }}>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text type="secondary">Total</Text>
                  <Text>¥ {subtotal.toFixed(2)}</Text>
                </Space>
                <Space style={{ width: "100%", justifyContent: "space-between" }}>
                  <Text type="secondary">Delivery fee</Text>
                  <Text>{fulfill === "delivery" ? "+ ¥ 10.00" : "¥ 0.00"}</Text>
                </Space>
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ width: "100%", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Statistic title="Total" value={total} prefix="¥ " precision={2} />
                  <Button type="primary" size="large" onClick={checkout}>Pay Now({items.length})</Button>
                </Space>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* Failure Modal */}
      <Modal
        title="Payment Failed"
        open={err.visible}
        footer={<Button type="primary" onClick={() => setErr({ visible: false, msg: "" })}>Got it</Button>}
        onCancel={() => setErr({ visible: false, msg: "" })}
      >
        <Result status="error" title="Payment Failed" subTitle={err.msg || "Please check the payment information and try again"} />
      </Modal>
    </Layout>
  );
}