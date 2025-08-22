export default function Pagination(props) {
  const { pagination, handlePageChange, currentPage } = props;
  return (
    <>
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <div
            style={{
              marginBottom: "10px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Page {pagination.page} of {pagination.totalPages} • Total:{" "}
            {pagination.total} items
          </div>

          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPrev}
            style={{
              padding: "8px 16px",
              margin: "0 5px",
              border: "1px solid #ddd",
              backgroundColor: pagination.hasPrev ? "white" : "#f5f5f5",
              color: pagination.hasPrev ? "#333" : "#999",
              cursor: pagination.hasPrev ? "pointer" : "not-allowed",
              borderRadius: "4px",
            }}
          >
            Previous
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  padding: "8px 16px",
                  margin: "0 5px",
                  border: "1px solid #ddd",
                  backgroundColor: page === currentPage ? "#3498db" : "white",
                  color: page === currentPage ? "white" : "#333",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNext}
            style={{
              padding: "8px 16px",
              margin: "0 5px",
              border: "1px solid #ddd",
              backgroundColor: pagination.hasNext ? "white" : "#f5f5f5",
              color: pagination.hasNext ? "#333" : "#999",
              cursor: pagination.hasNext ? "pointer" : "not-allowed",
              borderRadius: "4px",
            }}
          >
            Next
          </button>
        </div>
      )}

      {/* Results Info */}
      <div style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
        Found {pagination?.total || 0} items
        {pagination?.total > 0 && pagination?.totalPages > 1 && (
          <span>
            {" "}
            • Page {currentPage} of {pagination.totalPages}
          </span>
        )}
      </div>
    </>
  );
}
