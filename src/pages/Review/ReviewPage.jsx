import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { List, Typography } from "antd";
import ReviewRow from "../../components/ReviewRow";
import { dummyReviews, getMockReviewList } from "../../utils/mockData";
import Pagination from "../../components/Pagination";

const { Title } = Typography;

const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  useEffect(() => {
    fetchItems();
  }, [currentPage]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build API parameters
      const params = {
        page: currentPage,
        limit: 6,
      };

      // directly use Mock data
      // avoids the "Invalid API response" error
      const mockResult = getMockReviewList(params);
      setPagination(mockResult);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch review list:", error);
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          Customer Reviews
        </Title>
        <List
          itemLayout="vertical"
          dataSource={dummyReviews}
          renderItem={(review) => <ReviewRow review={review} />}
          split={false}
        />
      </div>
      <Pagination
        pagination={pagination}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default ReviewPage;
