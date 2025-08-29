const KEY = "user_posts";

// Load posts from localStorage
export function loadPosts() {
  try {
    const posts = localStorage.getItem(KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

// Save posts to localStorage
export function savePosts(posts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error saving posts:", error);
  }
}

// Add a new post
export function addPost(post) {
  const posts = loadPosts();
  const newPost = {
    ...post,
    id: Date.now(), // Simple ID generation
    createdAt: new Date().toISOString(),
    status: "on_sale"
  };
  posts.unshift(newPost); // Add to beginning of array
  savePosts(posts);
  return newPost;
}

// Get posts for a specific user
export function getUserPosts(userId) {
  const posts = loadPosts();
  return posts.filter(post => post.userId === userId);
}

// Update post status
export function updatePostStatus(postId, status) {
  const posts = loadPosts();
  const updatedPosts = posts.map(post => 
    post.id === postId ? { ...post, status } : post
  );
  savePosts(updatedPosts);
}

// Delete a post
export function deletePost(postId) {
  const posts = loadPosts();
  const filteredPosts = posts.filter(post => post.id !== postId);
  savePosts(filteredPosts);
}

// Clear all posts (for testing)
export function clearPosts() {
  localStorage.removeItem(KEY);
}
