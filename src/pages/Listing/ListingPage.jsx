import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { itemAPI } from "../../service/api";
import { getMockItemList, categories } from "../../utils/mockData";
import ItemCard from "../../components/ItemCard";
import Pagination from "../../components/Pagination";
import { Input, Button, Space, Card, Row, Col, Tooltip, Badge } from "antd";
import { HeartOutlined, ShoppingCartOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

export default function Listing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "All";
  const currentSearch = searchParams.get("search") || searchParams.get("keyword") || "";
  const currentSort = searchParams.get("sort") || "date-desc";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  useEffect(() => {
    fetchItems();
  }, [
    currentPage,
    currentCategory,
    currentSearch,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
  ]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build API parameters
      const params = {
        page: currentPage,
        category: currentCategory !== "All" ? currentCategory : undefined,
        search: currentSearch || undefined,
        sort: currentSort,
        minPrice: currentMinPrice ? parseInt(currentMinPrice) : undefined,
        maxPrice: currentMaxPrice ? parseInt(currentMaxPrice) : undefined,
        limit: 9,
      };

      // directly use Mock data
      // avoids the "Invalid API response" error
      const mockResult = getMockItemList(params);
      setItems(mockResult.items);
      setPagination(mockResult);
      setLoading(false);

      // backend is ready:
      /*
      try {
        const result = await itemAPI.getItemList(params);
        if (result && (result.items || Array.isArray(result))) {
          const items = result.items || result;
          setItems(items);
          setPagination({
            total: result.total || items.length,
            page: currentPage,
            totalPages: result.totalPages || Math.ceil((result.total || items.length) / 9),
            hasNext: result.hasNext || currentPage < Math.ceil((result.total || items.length) / 9),
            hasPrev: result.hasPrev || currentPage > 1
          });
          setLoading(false);
          return;
        } else {
          throw new Error('Invalid API response');
        }
      } catch (apiError) {
        console.log('API call failed, using Mock data:', apiError);
        const mockResult = getMockItemList(params);
        setItems(mockResult.items);
        setPagination(mockResult);
        setLoading(false);
      }
      */
    } catch (error) {
      console.error("Failed to fetch item list:", error);
      setError("Failed to load items");
      setLoading(false);
    }
  };

  // Update URL query parameters
  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      if (newParams[key] === "" || newParams[key] === null) {
        params.delete(key);
      } else {
        params.set(key, newParams[key]);
      }
    });
    // Reset to first page
    params.set("page", "1");
    setSearchParams(params);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    updateSearchParams({ category });
  };

  // Handle search - Same as HomePage
  const handleSearch = (kw) => {
    const keyword = (kw || "").trim();
    if (!keyword) return;
    updateSearchParams({ keyword });
  };

  // Action buttons for authenticated users
  const ActionButtons = () => {
    const authNav = (to) => {
      if (isAuthenticated) {
        navigate(to);
      } else {
        navigate("/login", { state: { from: to } });
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
  };

  // Handle sort
  const handleSortChange = (sort) => {
    updateSearchParams({ sort });
  };

  // Handle price filter
  const handlePriceFilter = (minPrice, maxPrice) => {
    updateSearchParams({ minPrice, maxPrice });
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

  // clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };



  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading items...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
      {/* Search Bar and Action Buttons - Same as HomePage */}
      <Card style={{ marginBottom: "12px" }}>
        <Row gutter={[12, 12]} align="middle">
          <Col xs={24} md={18}>
            <Search
              placeholder="Search"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
          </Col>
          <Col
            xs={24}
            md={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ActionButtons />
          </Col>
        </Row>
      </Card>

      {/* Main Container - Listing */}
      <div
        style={{
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#333",
            fontSize: "2rem",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "15px",
          }}
        >
          Listing
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "250px 1fr",
            gap: "30px",
          }}
        >
          {/* Left Side - Category Navigation */}
          <div>
            <h3
              style={{ marginBottom: "20px", color: "#333", fontSize: "18px" }}
            >
              Categories
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    backgroundColor:
                      currentCategory === category ? "#3498db" : "transparent",
                    color: currentCategory === category ? "white" : "#333",
                    border: `1px solid ${
                      currentCategory === category ? "#3498db" : "#ddd"
                    }`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight:
                      currentCategory === category ? "bold" : "normal",
                    transition: "all 0.2s",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Additional Filters */}
            <div style={{ marginTop: "30px" }}>
              <h4
                style={{
                  marginBottom: "15px",
                  color: "#333",
                  fontSize: "16px",
                }}
              >
                Price Range
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <input
                  type="number"
                  placeholder="Min Price"
                  value={currentMinPrice}
                  onChange={(e) =>
                    handlePriceFilter(e.target.value, currentMaxPrice)
                  }
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={currentMaxPrice}
                  onChange={(e) =>
                    handlePriceFilter(currentMinPrice, e.target.value)
                  }
                  style={{
                    padding: "8px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div style={{ marginTop: "20px" }}>
              <h4
                style={{
                  marginBottom: "15px",
                  color: "#333",
                  fontSize: "16px",
                }}
              >
                Sort By
              </h4>
              <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              >
                <option value="date-desc">Latest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="views-desc">Most Popular</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Right Side - Item Grid */}
          <div>
            {/* Items Grid - 3x3 Layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {items && items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "white",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <ItemCard item={item} />
                  </div>
                ))
              ) : (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    textAlign: "center",
                    padding: "50px 20px",
                    color: "#666",
                    fontSize: "16px",
                  }}
                >
                  No items found matching your criteria
                </div>
              )}
            </div>
            <Pagination
              pagination={pagination}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
