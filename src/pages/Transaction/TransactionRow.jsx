import React from "react";
import { List, Button } from "antd";
import { useNavigate } from "react-router-dom";

const TransactionRow = ({ transaction }) => {
  const navigate = useNavigate();

  const handleAddReview = () => {
    navigate(`/reviews/upload`);
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={`Transaction ID: ${transaction.id}`}
        description={`Item ID: ${transaction.itemId} - Status: ${transaction.status}`}
      />
      <Button type="primary" onClick={handleAddReview}>
        Add Review
      </Button>
    </List.Item>
  );
};

export default TransactionRow;
