import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { List, Card, Typography } from "antd";
import { dummyTransactions } from "../../utils/mockData";
import TransactionRow from "../Transaction/TransactionRow";
import Pagination from "../../components/Pagination";

const { Title } = Typography;

const TransactionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, currentSearch]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build API parameters
      const params = {
        page: currentPage,
        search: currentSearch || undefined,
        limit: 6,
      };

      // directly use Mock data
      // avoids the "Invalid API response" error
      const mockResult = getMockTransactionList(params);
      setPagination(mockResult);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch review list:", error);
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
    console.log("Page change requested:", page); // Debug log
    // avoid double clicking
    if (page === currentPage) return;

    // reset loading, page visual effects
    setLoading(true);

    // update url
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    setSearchParams(params);
  };

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Card>
          <Title level={2}>My Transactions</Title>
          <List
            loading={loading}
            dataSource={dummyTransactions}
            renderItem={(transaction) => (
              <TransactionRow transaction={transaction} />
            )}
          />
        </Card>
      </div>
      <Pagination
        pagination={pagination}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default TransactionPage;
