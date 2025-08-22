// Mock data - for frontend development and testing
export const mockItems = [
  // Electronics Category
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    description:
      "Brand new, unopened, 256GB, Space Black, Original Price $999, Current Price $799. Perfect condition, never used, comes with original box and accessories.",
    price: 799,
    originalPrice: 999,
    category: "Electronics",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=face",
    ],
    seller: {
      id: 1,
      name: "John Smith",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 156,
    },
    location: "New York, NY",
    createdAt: "2024-01-15T10:30:00Z",
    tags: ["Apple", "iPhone", "5G", "256GB", "Smartphone"],
    views: 234,
    likes: 45,
  },
  {
    id: 2,
    title: "MacBook Air M2",
    description:
      "2023 MacBook Air with M2 chip, 8GB RAM, 256GB SSD, slight usage marks but excellent performance. Great for work and study.",
    price: 650,
    originalPrice: 799,
    category: "Electronics",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=face",
    ],
    seller: {
      id: 2,
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 89,
    },
    location: "Los Angeles, CA",
    createdAt: "2024-01-14T15:20:00Z",
    tags: ["Apple", "MacBook", "M2 Chip", "Laptop", "Computer"],
    views: 189,
    likes: 32,
  },
  {
    id: 3,
    title: "Sony WH-1000XM4 Headphones",
    description:
      "Premium noise-canceling headphones, excellent sound quality, long battery life, minor wear but fully functional. Perfect for music lovers.",
    price: 180,
    originalPrice: 249,
    category: "Electronics",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 4,
      name: "Emily Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 67,
    },
    location: "Seattle, WA",
    createdAt: "2024-01-12T14:45:00Z",
    tags: ["Sony", "Headphones", "Noise Canceling", "Bluetooth", "Audio"],
    views: 98,
    likes: 15,
  },
  {
    id: 4,
    title: "Samsung Galaxy S24 Ultra",
    description:
      "Latest flagship Android phone, 512GB storage, excellent condition, comes with original charger and case. Perfect for Android enthusiasts.",
    price: 850,
    originalPrice: 1199,
    category: "Electronics",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 7,
      name: "Alex Chen",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 92,
    },
    location: "Austin, TX",
    createdAt: "2024-01-10T12:00:00Z",
    tags: ["Samsung", "Galaxy", "Android", "512GB", "Flagship"],
    views: 145,
    likes: 23,
  },
  {
    id: 5,
    title: "iPad Pro 12.9-inch",
    description:
      "2022 iPad Pro with M2 chip, 128GB storage, Apple Pencil included, perfect for artists and professionals.",
    price: 700,
    originalPrice: 899,
    category: "Electronics",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 8,
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
      rating: 4.5,
      totalSales: 45,
    },
    location: "San Diego, CA",
    createdAt: "2024-01-09T09:30:00Z",
    tags: ["Apple", "iPad", "M2 Chip", "Apple Pencil", "Tablet"],
    views: 78,
    likes: 12,
  },

  // Shoes Category
  {
    id: 6,
    title: "Nike Air Jordan 1 Retro",
    description:
      "Classic AJ1 High OG, Chicago colorway, size 10, brand new authentic. Perfect for sneaker collectors and basketball fans.",
    price: 120,
    originalPrice: 149,
    category: "Shoes",
    condition: "New",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d114d2c36?w=400&h=300&fit=crop&crop=face",
    ],
    seller: {
      id: 3,
      name: "Mike Davis",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 203,
    },
    location: "Chicago, IL",
    createdAt: "2024-01-13T09:15:00Z",
    tags: ["Nike", "Air Jordan", "AJ1", "Chicago", "Basketball"],
    views: 156,
    likes: 28,
  },
  {
    id: 7,
    title: "Adidas Ultraboost 21 Running Shoes",
    description:
      "Professional running shoes, size 9, Boost midsole, breathable upper, good condition. Ideal for runners and athletes.",
    price: 80,
    originalPrice: 129,
    category: "Shoes",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 5,
      name: "David Brown",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4.5,
      totalSales: 134,
    },
    location: "Miami, FL",
    createdAt: "2024-01-11T11:30:00Z",
    tags: ["Adidas", "Ultraboost", "Running", "Boost", "Athletic"],
    views: 76,
    likes: 12,
  },
  {
    id: 8,
    title: "Converse Chuck Taylor All Star",
    description:
      "Classic canvas sneakers, size 8, white color, good condition. Perfect for casual wear and street style.",
    price: 35,
    originalPrice: 55,
    category: "Shoes",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 9,
      name: "Tom Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.3,
      totalSales: 67,
    },
    location: "Portland, OR",
    createdAt: "2024-01-08T14:20:00Z",
    tags: ["Converse", "Chuck Taylor", "Canvas", "Casual", "Classic"],
    views: 45,
    likes: 8,
  },
  {
    id: 9,
    title: "New Balance 990v5",
    description:
      "Premium running shoes, size 10.5, Made in USA, excellent condition. Perfect for daily wear and light running.",
    price: 95,
    originalPrice: 185,
    category: "Shoes",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 10,
      name: "Lisa Thompson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 89,
    },
    location: "Boston, MA",
    createdAt: "2024-01-07T16:45:00Z",
    tags: ["New Balance", "990v5", "Running", "Made in USA", "Premium"],
    views: 67,
    likes: 15,
  },

  // Furniture Category
  {
    id: 10,
    title: "IKEA Malm Bed Frame",
    description:
      "Queen size bed frame, white finish, minimal wear, easy assembly. Perfect for modern bedroom decor.",
    price: 120,
    originalPrice: 199,
    category: "Furniture",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 6,
      name: "Lisa Anderson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 4.4,
      totalSales: 78,
    },
    location: "Portland, OR",
    createdAt: "2024-01-10T16:20:00Z",
    tags: ["IKEA", "Malm", "Bed Frame", "Queen", "Modern"],
    views: 65,
    likes: 8,
  },
  {
    id: 11,
    title: "West Elm Sofa",
    description:
      "3-seater modern sofa, gray fabric, excellent condition, barely used. Perfect for living room or office.",
    price: 450,
    originalPrice: 899,
    category: "Furniture",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 11,
      name: "Rachel Green",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 34,
    },
    location: "Denver, CO",
    createdAt: "2024-01-06T11:15:00Z",
    tags: ["West Elm", "Sofa", "Modern", "Gray", "Living Room"],
    views: 89,
    likes: 18,
  },
  {
    id: 12,
    title: "Vintage Wooden Dining Table",
    description:
      "Solid oak dining table, seats 6, rustic finish, good condition. Perfect for farmhouse or traditional decor.",
    price: 280,
    originalPrice: 450,
    category: "Furniture",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 12,
      name: "James Miller",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      rating: 4.2,
      totalSales: 56,
    },
    location: "Nashville, TN",
    createdAt: "2024-01-05T13:30:00Z",
    tags: ["Vintage", "Oak", "Dining Table", "Rustic", "Traditional"],
    views: 52,
    likes: 9,
  },

  // Clothing Category
  {
    id: 13,
    title: "Levi's 501 Jeans",
    description:
      "Classic straight leg jeans, size 32x32, dark wash, good condition. Perfect for everyday wear.",
    price: 25,
    originalPrice: 69,
    category: "Clothing",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 13,
      name: "Kevin Lee",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.4,
      totalSales: 123,
    },
    location: "Houston, TX",
    createdAt: "2024-01-04T10:45:00Z",
    tags: ["Levi's", "501", "Jeans", "Dark Wash", "Classic"],
    views: 78,
    likes: 14,
  },
  {
    id: 14,
    title: "The North Face Jacket",
    description:
      "Waterproof winter jacket, size L, black color, excellent condition. Perfect for cold weather and outdoor activities.",
    price: 85,
    originalPrice: 199,
    category: "Clothing",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 14,
      name: "Amanda White",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 67,
    },
    location: "Minneapolis, MN",
    createdAt: "2024-01-03T15:20:00Z",
    tags: ["The North Face", "Jacket", "Waterproof", "Winter", "Outdoor"],
    views: 95,
    likes: 21,
  },

  // Books Category
  {
    id: 15,
    title: "The Great Gatsby",
    description:
      "Classic novel by F. Scott Fitzgerald, hardcover edition, good condition. Perfect for literature lovers and collectors.",
    price: 8,
    originalPrice: 15,
    category: "Books",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 15,
      name: "Emma Davis",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 45,
    },
    location: "Atlanta, GA",
    createdAt: "2024-01-02T12:10:00Z",
    tags: [
      "F. Scott Fitzgerald",
      "The Great Gatsby",
      "Literature",
      "Hardcover",
      "Classic",
    ],
    views: 34,
    likes: 6,
  },
  {
    id: 16,
    title: "Programming JavaScript Applications",
    description:
      "Technical book for developers, covers modern JavaScript, good condition. Perfect for programmers and students.",
    price: 12,
    originalPrice: 39,
    category: "Books",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1517842645767-c6391347779d?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 16,
      name: "Chris Johnson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      rating: 4.5,
      totalSales: 23,
    },
    location: "Seattle, WA",
    createdAt: "2024-01-01T09:30:00Z",
    tags: [
      "Programming",
      "JavaScript",
      "Technical",
      "Development",
      "Education",
    ],
    views: 28,
    likes: 5,
  },

  // Home Category
  {
    id: 17,
    title: "KitchenAid Stand Mixer",
    description:
      "Professional stand mixer, red color, excellent condition, includes attachments. Perfect for home bakers.",
    price: 180,
    originalPrice: 299,
    category: "Home",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 17,
      name: "Jennifer Smith",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 78,
    },
    location: "Phoenix, AZ",
    createdAt: "2023-12-31T14:15:00Z",
    tags: ["KitchenAid", "Stand Mixer", "Kitchen", "Baking", "Professional"],
    views: 112,
    likes: 19,
  },
  {
    id: 18,
    title: "Dyson V11 Vacuum",
    description:
      "Cordless vacuum cleaner, excellent condition, includes all attachments. Perfect for home cleaning.",
    price: 220,
    originalPrice: 399,
    category: "Home",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 18,
      name: "Robert Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      rating: 4.4,
      totalSales: 56,
    },
    location: "Las Vegas, NV",
    createdAt: "2023-12-30T11:45:00Z",
    tags: ["Dyson", "V11", "Vacuum", "Cordless", "Cleaning"],
    views: 89,
    likes: 16,
  },

  // Sports Category
  {
    id: 19,
    title: "Wilson Tennis Racket",
    description:
      "Professional tennis racket, excellent condition, includes case. Perfect for tennis players.",
    price: 45,
    originalPrice: 89,
    category: "Sports",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 19,
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 34,
    },
    location: "Orlando, FL",
    createdAt: "2023-12-29T16:20:00Z",
    tags: ["Wilson", "Tennis", "Racket", "Professional", "Sports"],
    views: 67,
    likes: 12,
  },
  {
    id: 20,
    title: "Premium Yoga Mat",
    description:
      "High-quality yoga mat, non-slip surface, excellent condition. Perfect for yoga and fitness.",
    price: 18,
    originalPrice: 35,
    category: "Sports",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 20,
      name: "Sophie Chen",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop&crop=face",
      rating: 4.5,
      totalSales: 28,
    },
    location: "San Francisco, CA",
    createdAt: "2023-12-28T13:10:00Z",
    tags: ["Yoga", "Mat", "Fitness", "Non-slip", "Premium"],
    views: 45,
    likes: 8,
  },

  // Other Category
  {
    id: 21,
    title: "Vintage Vinyl Records",
    description:
      "Collection of 15 classic rock vinyl records, good condition. Perfect for music collectors and enthusiasts.",
    price: 75,
    originalPrice: 120,
    category: "Other",
    condition: "Good",
    images: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 21,
      name: "David Wilson",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      rating: 4.3,
      totalSales: 89,
    },
    location: "Austin, TX",
    createdAt: "2023-12-27T10:30:00Z",
    tags: ["Vintage", "Vinyl", "Rock", "Music", "Collection"],
    views: 56,
    likes: 11,
  },
  {
    id: 22,
    title: "Artisan Coffee Maker",
    description:
      "Handcrafted coffee maker, ceramic design, excellent condition. Perfect for coffee enthusiasts.",
    price: 35,
    originalPrice: 65,
    category: "Other",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=300&fit=crop",
    ],
    seller: {
      id: 22,
      name: "Sarah Kim",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 45,
    },
    location: "Portland, OR",
    createdAt: "2023-12-26T14:45:00Z",
    tags: ["Artisan", "Coffee", "Ceramic", "Handcrafted", "Kitchen"],
    views: 38,
    likes: 7,
  },
]; //need to move seller to dummyUsers block
export const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    location: "New York, USA",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Tom Smith",
    location: "London, UK",
    photo: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Carlos Garcia",
    location: "Madrid, Spain",
    photo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emily White",
    location: "Seattle, WA",
    photo: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "David Brown",
    location: "Miami, FL",
    photo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    location: "Portland, OR",
    photo: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    name: "Alex Chen",
    location: "Austin, TX",
    photo: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    name: "Maria Garcia",
    location: "San Diego, CA",
    photo: "https://i.pravatar.cc/150?img=8",
  },
];
export const dummyReviews = [
  {
    id: 1,
    buyerId: 1,
    itemId: 3,
    rating: 5,
    postedTime: "2 hours ago",
    review:
      "Absolutely love this jacket! It arrived in perfect condition, exactly as described. The seller was very communicative and shipped it quickly. Highly recommend!",
  },
  {
    id: 2,
    buyerId: 2,
    itemId: 1,
    rating: 4,
    postedTime: "1 day ago",
    review:
      "The chair is beautiful and fits perfectly in my study. There was a small scratch that wasn't mentioned in the description, but it's not very noticeable. Overall, a great purchase.",
  },
  {
    id: 3,
    buyerId: 3,
    itemId: 2,
    rating: 5,
    postedTime: "3 days ago",
    review:
      "An amazing find! The book was packaged with extreme care and arrived safely. The seller is a true professional. I couldn't be happier with my purchase.",
  },
  {
    id: 4,
    buyerId: 4,
    itemId: 5,
    rating: 3,
    postedTime: "5 days ago",
    review:
      "The iPad works well, but the battery life is not as good as expected. The seller was a bit slow to respond to my questions, but the item was shipped on time.",
  },
  {
    id: 5,
    buyerId: 5,
    itemId: 7,
    rating: 5,
    postedTime: "1 week ago",
    review:
      "These shoes are fantastic! They look brand new and are incredibly comfortable. The seller even included a handwritten thank you note. A+ experience!",
  },
  {
    id: 6,
    buyerId: 6,
    itemId: 10,
    rating: 4,
    postedTime: "2 weeks ago",
    review:
      "The bed frame is sturdy and was easy to assemble. There were a few minor scuffs from shipping, but they're not visible once the mattress is on. Good value for the price.",
  },
  {
    id: 7,
    buyerId: 7,
    itemId: 14,
    rating: 5,
    postedTime: "3 weeks ago",
    review:
      "This jacket is a lifesaver in the cold weather. It's warm, waterproof, and looks great. The seller was very friendly and answered all my questions.",
  },
  {
    id: 8,
    buyerId: 8,
    itemId: 18,
    rating: 2,
    postedTime: "1 month ago",
    review:
      "The vacuum cleaner is not as powerful as I had hoped. It struggles to pick up pet hair from the carpet. I probably should have invested in a new one.",
  },
];

export const dummyTransactions = [
  {
    id: 1,
    itemId: 1,
    buyerId: 2,
    start_time: "2024-01-20T10:00:00Z",
    complete_time: "2024-01-22T14:30:00Z",
    status: "committed",
  },
  {
    id: 2,
    itemId: 2,
    buyerId: 3,
    start_time: "2024-01-21T11:00:00Z",
    complete_time: null,
    status: "pending",
  },
  {
    id: 3,
    itemId: 3,
    buyerId: 1,
    start_time: "2024-01-22T12:00:00Z",
    complete_time: null,
    status: "active",
  },
  {
    id: 4,
    itemId: 4,
    buyerId: 5,
    start_time: "2024-01-23T13:00:00Z",
    complete_time: "2024-01-25T18:00:00Z",
    status: "committed",
  },
  {
    id: 5,
    itemId: 5,
    buyerId: 4,
    start_time: "2024-01-24T14:00:00Z",
    complete_time: null,
    status: "pending",
  },
  {
    id: 6,
    itemId: 6,
    buyerId: 7,
    start_time: "2024-01-25T15:00:00Z",
    complete_time: null,
    status: "active",
  },
  {
    id: 7,
    itemId: 7,
    buyerId: 6,
    start_time: "2024-01-26T16:00:00Z",
_time: "2024-01-28T20:00:00Z",
    status: "committed",
  },
  {
    id: 8,
    itemId: 8,
    buyerId: 8,
    start_time: "2024-01-27T17:00:00Z",
    complete_time: null,
    status: "pending",
  },
  {
    id: 9,
    itemId: 9,
    buyerId: 10,
    start_time: "2024-01-28T18:00:00Z",
    complete_time: null,
    status: "active",
  },
  {
    id: 10,
    itemId: 10,
    buyerId: 9,
    start_time: "2024-01-29T19:00:00Z",
    complete_time: "2024-01-31T22:00:00Z",
    status: "committed",
  },
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
  "Other",
];

export const getDummyUserById = (id) => {
  return dummyUsers.find((user) => user.id === parseInt(id));
};

// Get item by ID
export const getMockItemById = (id) => {
  return mockItems.find((item) => item.id === parseInt(id));
};

// Get item list with filtering, sorting, and pagination
export const getMockItemList = (params = {}) => {
  let filteredItems = [...mockItems];

  // Category filter
  if (params.category && params.category !== "All") {
    filteredItems = filteredItems.filter(
      (item) => item.category === params.category
    );
  }

  // Search filter
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  }

  // Price filter
  if (params.minPrice) {
    filteredItems = filteredItems.filter(
      (item) => item.price >= params.minPrice
    );
  }
  if (params.maxPrice) {
    filteredItems = filteredItems.filter(
      (item) => item.price <= params.maxPrice
    );
  }

  // Sorting
  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        filteredItems.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredItems.sort((a, b) => b.price - a.price);
        break;
      case "date-desc":
        filteredItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "views-desc":
        filteredItems.sort((a, b) => b.views - a.views);
        break;
      default:
        // Default sort by date
        filteredItems.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }

  const total = filteredItems.length;
  const requestedPage = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 9; // 每页9个商品，3x3网格

  // 计算总页数
  const totalPages = Math.ceil(total / limit);

  // 确保页码在有效范围内
  const validPage = Math.max(1, Math.min(requestedPage, totalPages));

  // 计算分页索引
  const startIndex = (validPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total); // 确保不超过总数

  // 分页数据
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // 返回分页信息
  return {
    items: paginatedItems,
    total,
    page: validPage,
    limit,
    totalPages,
    hasNext: validPage < totalPages,
    hasPrev: validPage > 1,
    // 添加调试信息
    debug: {
      requestedPage,
      validPage,
      startIndex,
      endIndex,
      itemsInPage: paginatedItems.length,
      totalItems: total,
      totalPages,
      limit,
    },
  };
};

export const getMockReviewList = (params = {}) => {
  let filteredReviews = [...dummyReviews];

  const total = filteredReviews.length;
  const requestedPage = parseInt(params.page) || 1;
  const limit = parseInt(params.limit) || 6; // 每页9个商品，3x3网格

  // 计算总页数
  const totalPages = Math.ceil(total / limit);

  // 确保页码在有效范围内
  const validPage = Math.max(1, Math.min(requestedPage, totalPages));

  // 计算分页索引
  const startIndex = (validPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total); // 确保不超过总数

  // 分页数据
  const paginatedReviews = filteredReviews.slice(startIndex, endIndex);

  // 返回分页信息
  return {
    reviews: paginatedReviews,
    total,
    page: validPage,
    limit,
    totalPages,
    hasNext: validPage < totalPages,
    hasPrev: validPage > 1,
    // 添加调试信息
    debug: {
      requestedPage,
      validPage,
      startIndex,
      endIndex,
      reviewsInPage: paginatedReviews.length,
      totalReviews: total,
      totalPages,
      limit,
    },
  };
};
