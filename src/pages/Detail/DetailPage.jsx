import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemAPI } from "../../service/api";
import { getMockItemById } from "../../service/mockData";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchItemDetail();
  }, [id]);

  const fetchItemDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Since backend is not ready, directly use Mock data
      // This avoids the "Invalid API response" error
      const itemData = getMockItemById(id);
      if (itemData) {
        setItem(itemData);
        setLoading(false);
      } else {
        setError("Item not found");
        setLoading(false);
      }

      // Uncomment this when backend is ready:
      /*
      try {
        const result = await itemAPI.getItemDetail(id);
        if (result && result.id) {
          setItem(result);
          setLoading(false);
        } else {
          throw new Error('Invalid API response');
        }
      } catch (apiError) {
        console.log('API call failed, using Mock data:', apiError);
        const itemData = getMockItemById(id);
        if (itemData) {
          setItem(itemData);
          setLoading(false);
        } else {
          setError('Item not found');
          setLoading(false);
        }
      }
      */
    } catch (error) {
      console.error("Failed to fetch item details:", error);
      setError("Failed to load item details");
      setLoading(false);
    }
  };

  const handleImageChange = (index) => {
    if (item && item.images && item.images[index]) {
      setCurrentImageIndex(index);
    }
  };

  const handleContactSeller = () => {
    // Add contact seller logic here
    alert("Contact seller feature to be implemented");
  };

  const handleBuyNow = () => {
    // Add buy now logic here
    alert("Buy now feature to be implemented");
  };

  const handleLike = async () => {
    if (!item) return;

    // Since backend is not ready, directly toggle local state
    // This avoids the 404 API error
    setIsLiked(!isLiked);

    // Uncomment this when backend is ready:
    /*
    try {
      if (isLiked) {
        // Unlike item
        await itemAPI.unlikeItem(id);
      } else {
        // Like item
        await itemAPI.likeItem(id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Like operation failed:', error);
      setIsLiked(!isLiked);
    }
    */
  };

  const handleBackToList = () => {
    navigate("/items");
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
        Loading item details...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>{error}</h2>
        <button
          onClick={handleBackToList}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to List
        </button>
      </div>
    );
  }

  // Show item not found state
  if (!item) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2 style={{ color: "#e74c3c", marginBottom: "20px" }}>
          Item not found
        </h2>
        <button
          onClick={handleBackToList}
          style={{
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to List
        </button>
      </div>
    );
  }

  // Safety check for images array
  const images =
    item.images && Array.isArray(item.images) && item.images.length > 0
      ? item.images
      : ["https://picsum.photos/400/300?random=999"];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <button
        onClick={handleBackToList}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back to List
      </button>

      {/* Main Content - Wireframe Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* Left Side - Images Section */}
        <div>
          {/* Main Image */}
          <div
            style={{
              width: "100%",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "2px solid #e0e0e0",
              marginBottom: "20px",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={images[currentImageIndex]}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f8f9fa",
                color: "#666",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              {item.title}
              <br />
              <span style={{ fontSize: "14px" }}>Image not available</span>
            </div>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${item.title} ${index + 1}`}
                  onClick={() => handleImageChange(index)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: `2px solid ${
                      currentImageIndex === index ? "#3498db" : "#e0e0e0"
                    }`,
                    objectFit: "cover",
                    backgroundColor: "#f8f9fa",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Product Information */}
        <div>
          {/* Item Name */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Item Name
            </label>
            <div
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {item.title || "No title available"}
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Categories
            </label>
            <div
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
              }}
            >
              {item.category || "No category"}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Price ⭐
            </label>
            <div
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
                fontSize: "24px",
                fontWeight: "bold",
                color: "#e74c3c",
              }}
            >
              ${item.price || 0}
              {item.originalPrice && item.originalPrice > (item.price || 0) && (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#999",
                    textDecoration: "line-through",
                    marginLeft: "10px",
                    fontWeight: "normal",
                  }}
                >
                  ${item.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Descriptions */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Descriptions
            </label>
            <div
              style={{
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "#f8f9fa",
                minHeight: "100px",
                lineHeight: "1.6",
                color: "#333",
              }}
            >
              {item.description || "No description available"}
            </div>
          </div>

          {/* Additional Info */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#666" }}>
                Condition:
              </span>
              <span
                style={{
                  background: "#e8f5e8",
                  color: "#27ae60",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                {item.condition || "Unknown"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f0f0f0",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#666" }}>
                Location:
              </span>
              <span style={{ color: "#333" }}>
                {item.location || "Unknown"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#666" }}>Posted:</span>
              <span style={{ color: "#333" }}>
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US")
                  : "Unknown"}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#666",
                marginBottom: "5px",
                fontSize: "14px",
              }}
            >
              Tags
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {item.tags && Array.isArray(item.tags) && item.tags.length > 0 ? (
                item.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#e3f2fd",
                      color: "#1976d2",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                    }}
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span style={{ color: "#999", fontSize: "12px" }}>
                  No tags available
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              color: "#666",
              fontSize: "12px",
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "4px",
            }}
          >
            <span>👁️ {item.views || 0} views</span>
            <span>❤️ {item.likes || 0} likes</span>
          </div>
        </div>
      </div>

      {/* Bottom Section - Seller Info and Action Buttons */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}
      >
        {/* Left - Seller Information */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "2px solid #e0e0e0",
          }}
        >
          <h3 style={{ margin: "0 0 20px 0", color: "#333", fontSize: "16px" }}>
            Seller Information
          </h3>
          {item.seller ? (
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={item.seller.avatar}
                alt={item.seller.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                style={{
                  display: "none",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#3498db",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                {item.seller.name
                  ? item.seller.name.charAt(0).toUpperCase()
                  : "?"}
              </div>
              <div>
                <h4
                  style={{
                    margin: "0 0 8px 0",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {item.seller.name || "Unknown Seller"}
                </h4>
                <div
                  style={{
                    color: "#f39c12",
                    marginBottom: "5px",
                    fontSize: "12px",
                  }}
                >
                  ⭐ {item.seller.rating || "N/A"}
                </div>
                <div style={{ color: "#666", fontSize: "12px" }}>
                  Total Sales: {item.seller.totalSales || "N/A"}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: "#666", fontSize: "14px" }}>
              Seller information not available
            </div>
          )}
        </div>

        {/* Right - Action Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              padding: "15px 24px",
              backgroundColor: isLiked ? "#e74c3c" : "#f39c12",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {isLiked ? "❤️ Favorited" : "🤍 Favorite"}
          </button>

          <button
            onClick={handleContactSeller}
            style={{
              padding: "15px 24px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Start chatting with seller
          </button>
        </div>
      </div>
    </div>
  );
}
