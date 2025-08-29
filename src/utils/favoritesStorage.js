const KEY = "user_favorites";

export function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(KEY, JSON.stringify(favorites));
}

export function addToFavorites(item) {
  const favorites = loadFavorites();
  const id = String(item.id);
  
  // Check if item already exists
  const existingIndex = favorites.findIndex(fav => String(fav.id) === id);
  if (existingIndex >= 0) {
    // Item already in favorites, remove it (toggle behavior)
    favorites.splice(existingIndex, 1);
  } else {
    // Add item to favorites
    const normalized = {
      id,
      name: item.name || item.title,
      price: Number(item.price || 0),
      image: item.image || item.img || (item.images && item.images[0]) || "",
      description: item.description || "",
      category: item.category || "",
      seller: item.seller || { name: "Unknown Seller" },
      createdAt: new Date().toISOString(),
    };
    favorites.push(normalized);
  }
  
  saveFavorites(favorites);
  return favorites;
}

export function removeFromFavorites(itemId) {
  const favorites = loadFavorites();
  const id = String(itemId);
  const filtered = favorites.filter(fav => String(fav.id) !== id);
  saveFavorites(filtered);
  return filtered;
}

export function isInFavorites(itemId) {
  const favorites = loadFavorites();
  const id = String(itemId);
  return favorites.some(fav => String(fav.id) === id);
}

export function clearFavorites() {
  localStorage.removeItem(KEY);
}
