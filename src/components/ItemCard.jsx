import React from "react";
import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "150px",
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={
            item.images && item.images[0]
              ? item.images[0]
              : "https://picsum.photos/150/150?random=999"
          }
          alt={item.title || "Item"}
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
            fontSize: "14px",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {item.title || "No Image"}
          <br />
          <span style={{ fontSize: "12px" }}>Image not available</span>
        </div>
      </div>
      <div style={{ padding: "15px" }}>
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "14px",
            color: "#333",
            lineHeight: "1.3",
            height: "40px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {item.title || "No title available"}
        </h3>
        <div style={{ marginBottom: "10px" }}>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#e74c3c",
            }}
          >
            ${item.price || 0}
          </span>
          {item.originalPrice && item.originalPrice > (item.price || 0) && (
            <span
              style={{
                fontSize: "12px",
                color: "#999",
                textDecoration: "line-through",
                marginLeft: "8px",
              }}
            >
              ${item.originalPrice}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#e8f5e8",
              color: "#27ae60",
              borderRadius: "4px",
              fontSize: "11px",
            }}
          >
            {item.condition || "Unknown"}
          </span>
          <span style={{ fontSize: "11px", color: "#666" }}>
            {item.location || "Unknown"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "10px",
          }}
        >
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: item.stockQuantity > 0 ? "#e8f5e8" : "#ffeaea",
              color: item.stockQuantity > 0 ? "#27ae60" : "#e74c3c",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            {item.stockQuantity > 0 ? `${item.stockQuantity} in stock` : "Out of stock"}
          </span>
        </div>
        <Link
          to={`/items/${item.id}`}
          style={{
            display: "block",
            width: "100%",
            padding: "8px",
            backgroundColor: "#3498db",
            color: "white",
            textAlign: "center",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          View Details
        </Link>
      </div>
    </>
  );
}
