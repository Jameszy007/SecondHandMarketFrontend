const KEY = "user_reviews";

// Load reviews from localStorage
export function loadReviews() {
  try {
    const reviews = localStorage.getItem(KEY);
    return reviews ? JSON.parse(reviews) : [];
  } catch (error) {
    console.error("Error loading reviews:", error);
    return [];
  }
}

// Save reviews to localStorage
export function saveReviews(reviews) {
  try {
    localStorage.setItem(KEY, JSON.stringify(reviews));
  } catch (error) {
    console.error("Error saving reviews:", error);
  }
}

// Add a new review
export function addReview(review) {
  const reviews = loadReviews();
  const newReview = {
    ...review,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString(),
  };
  reviews.unshift(newReview); // Add to beginning of array
  saveReviews(reviews);
  return newReview;
}

// Get reviews for a specific user (reviews they wrote + reviews of their items)
export function getUserReviews(userId) {
  const reviews = loadReviews();
  return reviews.filter(review => 
    review.userId === userId || // Reviews written by the user
    review.itemSellerId === userId // Reviews of items sold by the user
  );
}

// Get reviews written by a specific user
export function getReviewsByUser(userId) {
  const reviews = loadReviews();
  return reviews.filter(review => review.userId === userId);
}

// Get reviews of items sold by a specific user
export function getReviewsOfUserItems(userId) {
  const reviews = loadReviews();
  return reviews.filter(review => review.itemSellerId === userId);
}

// Delete a review
export function deleteReview(reviewId) {
  const reviews = loadReviews();
  const filteredReviews = reviews.filter(review => review.id !== reviewId);
  saveReviews(filteredReviews);
}

// Clear all reviews (for testing)
export function clearReviews() {
  localStorage.removeItem(KEY);
}
