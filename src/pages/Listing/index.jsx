import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { itemAPI } from '../../service/api';
import { getMockItemList, categories } from '../../service/mockData';

export default function Listing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  // Get query parameters from URL
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'date-desc';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    fetchItems();
  }, [currentPage, currentCategory, currentSearch, currentSort, currentMinPrice, currentMaxPrice]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build API parameters
      const params = {
        page: currentPage,
        category: currentCategory !== 'All' ? currentCategory : undefined,
        search: currentSearch || undefined,
        sort: currentSort,
        minPrice: currentMinPrice ? parseInt(currentMinPrice) : undefined,
        maxPrice: currentMaxPrice ? parseInt(currentMaxPrice) : undefined,
        limit: 9
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
      console.error('Failed to fetch item list:', error);
      setError('Failed to load items');
      setLoading(false);
    }
  };

  // Update URL query parameters
  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === '' || newParams[key] === null) {
        params.delete(key);
      } else {
        params.set(key, newParams[key]);
      }
    });
    // Reset to first page
    params.set('page', '1');
    setSearchParams(params);
  };

  // Handle category filter
  const handleCategoryChange = (category) => {
    updateSearchParams({ category });
  };

  // Handle search
  const handleSearch = (searchTerm) => {
    updateSearchParams({ search: searchTerm });
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
    console.log('Page change requested:', page); // Debug log
    // avoid double clicking
    if (page === currentPage) return;
    
    // reset loading, page visual effects
    setLoading(true);
    
    // update url
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  // clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Debug pagination info
  console.log('Current pagination state:', {
    currentPage,
    pagination,
    totalItems: items.length,
    hasNext: pagination?.hasNext,
    hasPrev: pagination?.hasPrev,
    totalPages: pagination?.totalPages,
    total: pagination?.total,
    currentItemsCount: items.length
  });

  // Show loading state
  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '100px 20px',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading items...
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2 style={{ color: '#e74c3c', marginBottom: '20px' }}>{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#3498db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Top Section - Search Bar and User Profile */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0'
      }}>
        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search Item Name"
              value={currentSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ 
                width: '100%',
                padding: '12px 40px 12px 15px',
                border: '1px solid #ddd',
                borderRadius: '25px',
                fontSize: '16px',
                outline: 'none'
              }}
            />
            <span style={{ 
              position: 'absolute', 
              right: '15px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              fontSize: '18px',
              color: '#666'
            }}>
              🔍
            </span>
          </div>
        </div>

        {/* User Profile/Avatar */}
        <div style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '50%', 
          backgroundColor: '#3498db',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
          marginLeft: '20px'
        }}>
          👤
        </div>
      </div>

      {/* Main Container - Listing */}
      <div style={{ 
        border: '2px solid #e0e0e0', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: 'white'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#333', 
          fontSize: '2rem',
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: '15px'
        }}>
          Listing
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
          
          {/* Left Side - Category Navigation */}
          <div>
            <h3 style={{ marginBottom: '20px', color: '#333', fontSize: '18px' }}>Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  style={{ 
                    padding: '12px 16px',
                    textAlign: 'left',
                    backgroundColor: currentCategory === category ? '#3498db' : 'transparent',
                    color: currentCategory === category ? 'white' : '#333',
                    border: `1px solid ${currentCategory === category ? '#3498db' : '#ddd'}`,
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: currentCategory === category ? 'bold' : 'normal',
                    transition: 'all 0.2s'
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Additional Filters */}
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Price Range</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={currentMinPrice}
                  onChange={(e) => handlePriceFilter(e.target.value, currentMaxPrice)}
                  style={{ 
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={currentMaxPrice}
                  onChange={(e) => handlePriceFilter(currentMinPrice, e.target.value)}
                  style={{ 
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Sort By</h4>
              <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
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
                width: '100%',
                marginTop: '20px',
                padding: '10px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Clear Filters
            </button>
          </div>

          {/* Right Side - Item Grid */}
          <div>
            {/* Items Grid - 3x3 Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              {items && items.length > 0 ? (
                items.map((item) => (
                  <div key={item.id} style={{ 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}>
                    <div style={{ 
                      width: '100%', 
                      height: '150px', 
                      overflow: 'hidden',
                      backgroundColor: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={item.images && item.images[0] ? item.images[0] : 'https://picsum.photos/150/150?random=999'} 
                        alt={item.title || 'Item'} 
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div style={{ 
                        display: 'none',
                        width: '100%', 
                        height: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f8f9fa',
                        color: '#666',
                        fontSize: '14px',
                        textAlign: 'center',
                        padding: '10px'
                      }}>
                        {item.title || 'No Image'}<br/>
                        <span style={{ fontSize: '12px' }}>Image not available</span>
                      </div>
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h3 style={{ 
                        margin: '0 0 10px 0', 
                        fontSize: '14px', 
                        color: '#333',
                        lineHeight: '1.3',
                        height: '40px',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {item.title || 'No title available'}
                      </h3>
                      <div style={{ marginBottom: '10px' }}>
                        <span style={{ 
                          fontSize: '16px', 
                          fontWeight: 'bold', 
                          color: '#e74c3c' 
                        }}>
                          ${item.price || 0}
                        </span>
                        {item.originalPrice && item.originalPrice > (item.price || 0) && (
                          <span style={{ 
                            fontSize: '12px', 
                            color: '#999', 
                            textDecoration: 'line-through', 
                            marginLeft: '8px' 
                          }}>
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        marginBottom: '10px'
                      }}>
                        <span style={{ 
                          padding: '4px 8px', 
                          backgroundColor: '#e8f5e8', 
                          color: '#27ae60', 
                          borderRadius: '4px', 
                          fontSize: '11px' 
                        }}>
                          {item.condition || 'Unknown'}
                        </span>
                        <span style={{ fontSize: '11px', color: '#666' }}>
                          {item.location || 'Unknown'}
                        </span>
                      </div>
                      <Link 
                        to={`/items/${item.id}`} 
                        style={{ 
                          display: 'block',
                          width: '100%',
                          padding: '8px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          textAlign: 'center',
                          textDecoration: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: '50px 20px',
                  color: '#666',
                  fontSize: '16px'
                }}>
                  No items found matching your criteria
                </div>
              )}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div style={{ textAlign: 'center', margin: '30px 0' }}>
                <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
                  Page {pagination.page} of {pagination.totalPages} • Total: {pagination.total} items
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrev}
                  style={{ 
                    padding: '8px 16px', 
                    margin: '0 5px',
                    border: '1px solid #ddd',
                    backgroundColor: pagination.hasPrev ? 'white' : '#f5f5f5',
                    color: pagination.hasPrev ? '#333' : '#999',
                    cursor: pagination.hasPrev ? 'pointer' : 'not-allowed',
                    borderRadius: '4px'
                  }}
                >
                  Previous
                </button>
                
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{ 
                      padding: '8px 16px', 
                      margin: '0 5px',
                      border: '1px solid #ddd',
                      backgroundColor: page === currentPage ? '#3498db' : 'white',
                      color: page === currentPage ? 'white' : '#333',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNext}
                  style={{ 
                    padding: '8px 16px', 
                    margin: '0 5px',
                    border: '1px solid #ddd',
                    backgroundColor: pagination.hasNext ? 'white' : '#f5f5f5',
                    color: pagination.hasNext ? '#333' : '#999',
                    cursor: pagination.hasNext ? 'pointer' : 'not-allowed',
                    borderRadius: '4px'
                  }}
                >
                  Next
                </button>
              </div>
            )}

            {/* Results Info */}
            <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
              Found {pagination?.total || 0} items
              {pagination?.total > 0 && pagination?.totalPages > 1 && (
                <span> • Page {currentPage} of {pagination.totalPages}</span>
              )}
            </div>
            
            {/* Debug Info - 开发时显示，生产环境可以隐藏 */}
            {pagination?.debug && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#666',
                textAlign: 'left'
              }}>
                <strong>Debug Info:</strong><br/>
                Requested Page: {pagination.debug.requestedPage}<br/>
                Valid Page: {pagination.debug.validPage}<br/>
                Items in Current Page: {pagination.debug.itemsInPage}<br/>
                Start Index: {pagination.debug.startIndex}<br/>
                End Index: {pagination.debug.endIndex}<br/>
                Total Items: {pagination.debug.totalItems}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}