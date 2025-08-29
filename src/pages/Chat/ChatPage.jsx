import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Layout, Input, Button, List, Avatar, Badge, Typography, Divider, Space,
} from "antd";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider, Content, Header, Footer } = Layout;
const { Text, Title } = Typography;

const LS_KEY = "chat_contacts_v1";
const loadContacts = () => {
  try { const v = JSON.parse(localStorage.getItem(LS_KEY)); return Array.isArray(v) ? v : []; }
  catch { return []; }
};
const saveContacts = (list) => { try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch (err) {console.warn("[chat] loadContacts failed:", err);
    return [];} };

const nowTime = () => new Date().toTimeString().slice(0, 5);

function Bubble({ text, side }) {
  const isRight = side === "right";
  return (
    <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start", padding: "6px 0" }}>
      <div
        style={{
          maxWidth: 520, background: isRight ? "#95ec69" : "#fff", color: "#000",
          padding: "10px 12px", borderRadius: 12,
          borderTopRightRadius: isRight ? 4 : 12, borderTopLeftRadius: isRight ? 12 : 4,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)", whiteSpace: "pre-wrap", wordBreak: "break-word",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();

  const initial = loadContacts();
  const [users, setUsers] = useState(initial);
  const [activeId, setActiveId] = useState(initial[0]?.id || "");
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => { saveContacts(users); }, [users]);

  useEffect(() => {
    const incoming = location.state?.seller;
    const product = location.state?.product; // { id, title }
    if (!incoming) return;

    const seller = {
      id: String(incoming.id),
      name: incoming.name || `Seller ${incoming.id}`,
      avatar:
        incoming.avatar ||
        `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
          incoming.name || String(incoming.id)
        )}`,
    };

    setUsers((prev) => {
      const exists = prev.find((u) => u.id === seller.id);
      if (exists) {
        setActiveId(exists.id);
        return prev;
      }
      const welcome = product?.title
        ? `Hello, I'm the seller(${product.title}). Is there anything you want to know?`
        : "Hello, I'm the seller. Is there anything you want to know?";
      const newContact = {
        id: seller.id,
        name: seller.name,
        avatar: seller.avatar,
        unread: 0,
        messages: [{ id: Date.now(), sender: "them", text: welcome, time: nowTime() }],
      };
      setActiveId(seller.id);
      return [newContact, ...prev];
    });

    navigate("/chat", { replace: true });
  }, [location.state, navigate]);

  const active = useMemo(
    () => users.find((u) => u.id === activeId) || users[0],
    [users, activeId]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [active?.messages?.length, activeId]);

  const send = () => {
    const text = draft.trim();
    if (!text || !active) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === active.id
          ? { ...u, messages: [...u.messages, { id: Date.now(), sender: "me", text, time: nowTime() }] }
          : u
      )
    );
    setDraft("");
  };

  const onPressEnter = (e) => {
    if (!e.shiftKey) { e.preventDefault(); send(); }
  };

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, search]);

  return (
    <Layout style={{ height: "100vh", background: "#f5f5f5" }}>
      {/* Left: Contacts */}
      <Sider width={280} style={{ background: "#fff", borderRight: "1px solid #f0f0f0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: 12 }}>
          <Input allowClear prefix={<SearchOutlined />} placeholder="Search the seller?" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Divider style={{ margin: "8px 0" }} />
        <div style={{ overflow: "auto" }}>
          <List
            itemLayout="horizontal"
            dataSource={filteredUsers}
            locale={{ emptyText: "Seller not found" }}
            renderItem={(item) => {
              const last = item.messages[item.messages.length - 1];
              const isActive = item.id === activeId;
              return (
                <List.Item
                  style={{ padding: "10px 12px", cursor: "pointer", background: isActive ? "#e6f4ff" : undefined }}
                  onClick={() => setActiveId(item.id)}
                >
                  <List.Item.Meta
                    avatar={<Badge count={item.unread} size="small"><Avatar src={item.avatar} /></Badge>}
                    title={
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Text strong ellipsis style={{ maxWidth: 160 }}>{item.name}</Text>
                        <Text type="secondary" style={{ marginLeft: 8 }}>{last?.time ?? ""}</Text>
                      </div>
                    }
                    description={<Text type="secondary" ellipsis={{ tooltip: last?.text }}>{last?.text}</Text>}
                  />
                </List.Item>
              );
            }}
          />
        </div>
      </Sider>

      {/* Right: Conversation */}
      <Layout>
        <Header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", padding: "0 16px" }}>
          <Space size="middle" align="center">
            <Avatar src={active?.avatar} />
            <Title level={5} style={{ margin: 0 }}>{active?.name || ""}</Title>
          </Space>
        </Header>

        {/* Messages */}
        <Content style={{ display: "flex", flexDirection: "column" }}>
          <div ref={scrollRef} style={{ flex: 1, padding: 16, overflow: "auto", background: "#f5f5f5" }}>
            {active?.messages?.map((m) => (
              <Bubble key={m.id} text={m.text} side={m.sender === "me" ? "right" : "left"} />
            ))}
          </div>

          {/* Composer */}
          <Footer style={{ background: "#fff", borderTop: "1px solid #f0f0f0", padding: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <Input.TextArea
                autoSize={{ minRows: 1, maxRows: 6 }}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onPressEnter={onPressEnter}
                placeholder="Enter the message. (Press 'Enter' to send and 'Shift+Enter' to wrap lines)"
              />
              <Button type="primary" icon={<SendOutlined />} onClick={send} disabled={!draft.trim() || !active}>
                Send
              </Button>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
