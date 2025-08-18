// Mock data - for frontend development and testing
export const mockItems = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    description: "Brand new, unopened, 256GB, Space Black, Original Price $999, Current Price $799. Perfect condition, never used, comes with original box and accessories.",
    price: 799,
    originalPrice: 999,
    category: "Electronics",
    condition: "New",
    images: [
      "https://via.placeholder.com/400x300/007AFF/FFFFFF?text=iPhone+15+Pro+Max",
      "https://via.placeholder.com/400x300/007AFF/FFFFFF?text=iPhone+15+Pro+Max+2"
    ],
    seller: {
      id: 1,
      name: "John Smith",
      avatar: "https://via.placeholder.com/50x50/FF6B6B/FFFFFF?text=JS",
      rating: 4.8,
      totalSales: 156
    },
    location: "New York, NY",
    createdAt: "2024-01-15T10:30:00Z",
    tags: ["Apple", "Phone", "5G", "256GB", "Smartphone"],
    views: 234,
    likes: 45
  },
  {
    id: 2,
    title: "MacBook Air M2",
    description: "2023 MacBook Air with M2 chip, 8GB RAM, 256GB SSD, slight usage marks but excellent performance. Great for work and study.",
    price: 650,
    originalPrice: 799,
    category: "Electronics",
    condition: "Like New",
    images: [
      "https://via.placeholder.com/400x300/00D4AA/FFFFFF?text=MacBook+Air+M2",
      "https://via.placeholder.com/400x300/00D4AA/FFFFFF?text=MacBook+Air+M2+2"
    ],
    seller: {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://via.placeholder.com/50x50/4ECDC4/FFFFFF?text=SJ",
      rating: 4.9,
      totalSales: 89
    },
    location: "Los Angeles, CA",
    createdAt: "2024-01-14T15:20:00Z",
    tags: ["Apple", "Laptop", "M2 Chip", "Ultrabook", "Computer"],
    views: 189,
    likes: 32
  },
  {
    id: 3,
    title: "Nike Air Jordan 1 Retro",
    description: "Classic AJ1 High OG, Chicago colorway, size 10, brand new authentic. Perfect for sneaker collectors and basketball fans.",
    price: 120,
    originalPrice: 149,
    category: "Shoes",
    condition: "New",
    images: [
      "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Nike+AJ1",
      "https://via.placeholder.com/400x300/FF6B6B/FFFFFF?text=Nike+AJ1+2"
    ],
    seller: {
      id: 3,
      name: "Mike Davis",
      avatar: "https://via.placeholder.com/50x50/45B7D1/FFFFFF?text=MD",
      rating: 4.7,
      totalSales: 203
    },
    location: "Chicago, IL",
    createdAt: "2024-01-13T09:15:00Z",
    tags: ["Nike", "Basketball", "AJ1", "Chicago", "Sneakers"],
    views: 156,
    likes: 28
  },
  {
    id: 4,
    title: "Sony WH-1000XM4 Headphones",
    description: "Premium noise-canceling headphones, excellent sound quality, long battery life, minor wear but fully functional. Perfect for music lovers.",
    price: 180,
    originalPrice: 249,
    category: "Electronics",
    condition: "Good",
    images: [
      "https://via.placeholder.com/400x300/9B59B6/FFFFFF?text=Sony+WH-1000XM4"
    ],
    seller: {
      id: 4,
      name: "Emily Wilson",
      avatar: "https://via.placeholder.com/50x50/E67E22/FFFFFF?text=EW",
      rating: 4.6,
      totalSales: 67
    },
    location: "Seattle, WA",
    createdAt: "2024-01-12T14:45:00Z",
    tags: ["Sony", "Headphones", "Noise Canceling", "Bluetooth", "Audio"],
    views: 98,
    likes: 15
  },
  {
    id: 5,
    title: "Adidas Ultraboost 21 Running Shoes",
    description: "Professional running shoes, size 9, Boost midsole, breathable upper, good condition. Ideal for runners and athletes.",
    price: 80,
    originalPrice: 129,
    category: "Shoes",
    condition: "Good",
    images: [
      "https://via.placeholder.com/400x300/3498DB/FFFFFF?text=Adidas+Ultraboost"
    ],
    seller: {
      id: 5,
      name: "David Brown",
      avatar: "https://via.placeholder.com/50x50/1ABC9C/FFFFFF?text=DB",
      rating: 4.5,
      totalSales: 134
    },
    location: "Miami, FL",
    createdAt: "2024-01-11T11:30:00Z",
    tags: ["Adidas", "Running", "Boost", "Breathable", "Athletic"],
    views: 76,
    likes: 12
  },
  {
    id: 6,
    title: "IKEA Malm Bed Frame",
    description: "Queen size bed frame, white finish, minimal wear, easy assembly. Perfect for modern bedroom decor.",
    price: 120,
    originalPrice: 199,
    category: "Furniture",
    condition: "Good",
    images: [
      "https://via.placeholder.com/400x300/95A5A6/FFFFFF?text=IKEA+Malm+Bed"
    ],
    seller: {
      id: 6,
      name: "Lisa Anderson",
      avatar: "https://via.placeholder.com/50x50/E74C3C/FFFFFF?text=LA",
      rating: 4.4,
      totalSales: 78
    },
    location: "Portland, OR",
    createdAt: "2024-01-10T16:20:00Z",
    tags: ["IKEA", "Bed", "Queen", "White", "Modern"],
    views: 65,
    likes: 8
  }
];

// Product categories
export const categories = [
  "All",
  "Electronics",
  "Shoes",
  "Furniture",
  "Clothing",
  "Books",
  "Home",
  "Sports",
  "Other"
];

// Get item by ID
export const getMockItemById = (id) => {
  return mockItems.find(item => item.id === parseInt(id));
};

// Get item list with filtering, sorting, and pagination
export const getMockItemList = (params = {}) => {
  let filteredItems = [...mockItems];
  
  // Category filter
  if (params.category && params.category !== "All") {
    filteredItems = filteredItems.filter(item => item.category === params.category);
  }
  
  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredItems = filteredItems.filter(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }
  
  // Price filter
  if (params.minPrice) {
    filteredItems = filteredItems.filter(item => item.price >= params.minPrice);
  }
  if (params.maxPrice) {
    filteredItems = filteredItems.filter(item => item.price <= params.maxPrice);
  }
  
  // Sorting
  if (params.sort) {
    switch (params.sort) {
      case 'price-asc':
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case 'date-desc':
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'views-desc':
        filteredItems.sort((a, b) => b.views - a.views);
        break;
      default:
        // Default sort by date
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  }
  
  const total = filteredItems.length;
  const page = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Pagination
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  
  return {
    items: paginatedItems,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNext: page < Math.ceil(total / limit),
    hasPrev: page > 1
  };
};
