import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { List, Card, Typography, Empty } from "antd";
import TransactionRow from "../Transaction/TransactionRow";
import Pagination from "../../components/Pagination";
import { getUserTransactions } from "../../utils/transactionStorage";
import { useAuth } from "../../hooks/useAuth";

const { Title } = Typography;

const TransactionPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);
  const { user } = useAuth();
  
  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  
  useEffect(() => {
    fetchTransactions();
  }, [currentPage, currentSearch, user]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      if (user) {
        // Get user's transactions from storage
        const userTransactions = getUserTransactions(user.id);
        
        // Filter by search term if provided
        const filteredTransactions = currentSearch 
          ? userTransactions.filter(t => 
              t.items?.some(item => 
                item.title?.toLowerCase().includes(currentSearch.toLowerCase())
              )
            )
          : userTransactions;

        // Pagination
        const pageSize = 6;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

        const result = {
          current: currentPage,
          total: filteredTransactions.length,
          pageSize: pageSize,
          data: paginatedTransactions
        };
        
        setTransactions(paginatedTransactions);
        setPagination(result);
      } else {
        setTransactions([]);
        setPagination({
          current: currentPage,
          total: 0,
          pageSize: 6,
          data: []
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setError("Failed to load transactions");
      setLoading(false);
    }
  };

  // Handle pagination
  const handlePageChange = (page) => {
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
          {!user ? (
            <Empty description="Please log in to view your transactions" />
          ) : transactions.length === 0 && !loading ? (
            <Empty description="No transactions yet" />
          ) : (
            <List
              loading={loading}
              dataSource={transactions}
              renderItem={(transaction) => (
                <TransactionRow transaction={transaction} />
              )}
            />
          )}
        </Card>
      </div>
      {pagination.total > 0 && (
        <Pagination
          pagination={pagination}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default TransactionPage;
