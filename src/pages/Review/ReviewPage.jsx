import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { List, Typography, Empty, Tabs } from "antd";
import ReviewRow from "../../components/ReviewRow";
import { getUserReviews, getReviewsByUser, getReviewsOfUserItems } from "../../utils/reviewsStorage";
import { useAuth } from "../../hooks/useAuth";
import Pagination from "../../components/Pagination";

const { Title } = Typography;

const ReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  
  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  
  useEffect(() => {
    fetchReviews();
  }, [currentPage, user]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      if (user) {
        // Get user's reviews from storage
        const userReviews = getUserReviews(user.id);
        
        // Pagination
        const pageSize = 6;
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedReviews = userReviews.slice(startIndex, endIndex);

        const result = {
          current: currentPage,
          total: userReviews.length,
          pageSize: pageSize,
          data: paginatedReviews
        };
        
        setReviews(paginatedReviews);
        setPagination(result);
      } else {
        setReviews([]);
        setPagination({
          current: currentPage,
          total: 0,
          pageSize: 6,
          data: []
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
          My Reviews
        </Title>
        
        {!user ? (
          <Empty description="Please log in to view your reviews" />
        ) : reviews.length === 0 && !loading ? (
          <Empty description="No reviews yet" />
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={reviews}
              renderItem={(review) => <ReviewRow review={review} />}
              split={false}
            />
            {pagination.total > 0 && (
              <Pagination
                pagination={pagination}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewPage;
