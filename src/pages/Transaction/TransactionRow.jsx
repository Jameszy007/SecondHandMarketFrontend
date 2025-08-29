import React from "react";
import { List, Button, Tag, Space, Typography, Image, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { CreditCardOutlined, BankOutlined, PayCircleOutlined, ShoppingOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const TransactionRow = ({ transaction }) => {
  const navigate = useNavigate();

  const handleAddReview = (item) => {
    // Pass item information to the review upload page
    navigate(`/reviews/upload`, { 
      state: { 
        itemId: item.id,
        itemTitle: item.title 
      } 
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString();
  };

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'Credit':
        return <CreditCardOutlined />;
      case 'Debit':
        return <BankOutlined />;
      case 'PayPal':
        return <PayCircleOutlined />;
      default:
        return <ShoppingOutlined />;
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'completed':
        return <Tag color="green">Completed</Tag>;
      case 'pending':
        return <Tag color="orange">Pending</Tag>;
      case 'cancelled':
        return <Tag color="red">Cancelled</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  return (
    <List.Item>
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <Title level={5} style={{ margin: 0 }}>
              Order #{transaction.id}
            </Title>
            <Text type="secondary">
              {formatDate(transaction.createdAt)}
            </Text>
          </div>
          <Space>
            {getStatusTag(transaction.status)}
            {transaction.items?.length > 0 && (
              <Button 
                type="primary" 
                size="small" 
                onClick={() => handleAddReview(transaction.items[0])}
              >
                Add Review
              </Button>
            )}
          </Space>
        </div>

        <Divider style={{ margin: '8px 0' }} />

        {/* Items */}
        <div style={{ marginBottom: '12px' }}>
          {transaction.items?.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Image
                src={item.image}
                width={40}
                height={40}
                style={{ objectFit: 'cover', borderRadius: '4px', marginRight: '12px' }}
                fallback="https://placehold.co/40x40?text=No+Image"
              />
              <div style={{ flex: 1 }}>
                <Text strong>{item.title}</Text>
                <br />
                <Text type="secondary">
                  ${item.price.toFixed(2)} × {item.quantity}
                </Text>
              </div>
            </div>
          ))}
        </div>

        <Divider style={{ margin: '8px 0' }} />

        {/* Payment Details */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Space direction="vertical" size="small">
            <div>
              <Text type="secondary">Payment Method: </Text>
              <Space>
                {getPaymentIcon(transaction.paymentMethod)}
                <Text>{transaction.paymentMethod}</Text>
              </Space>
            </div>
            <div>
              <Text type="secondary">Fulfillment: </Text>
              <Text>{transaction.fulfillmentMethod === 'pickup' ? 'Pickup' : 'Delivery'}</Text>
            </div>
          </Space>
          
          <div style={{ textAlign: 'right' }}>
            <div>
              <Text type="secondary">Subtotal: </Text>
              <Text>${transaction.subtotal?.toFixed(2)}</Text>
            </div>
            {transaction.deliveryFee > 0 && (
              <div>
                <Text type="secondary">Delivery: </Text>
                <Text>${transaction.deliveryFee?.toFixed(2)}</Text>
              </div>
            )}
            <div>
              <Text strong style={{ fontSize: '16px' }}>
                Total: ${transaction.total?.toFixed(2)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </List.Item>
  );
};

export default TransactionRow;
