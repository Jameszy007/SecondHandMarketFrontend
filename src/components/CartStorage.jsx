const KEY = "cart_items";

export function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addToCart(product, qty = 1) {
  const items = loadCart();
  const id = String(product.id);
  const stockQuantity = Number(product.stockQuantity || 1);
  
  const normalized = {
    id,
    title: product.title,
    price: Number(product.price || 0),
    img: product.img || (product.images && product.images[0]) || "",
    qty: Number(qty) || 1,
    stockQuantity: stockQuantity,
  };

  const i = items.findIndex((x) => String(x.id) === id);
  if (i >= 0) {
    const newQty = items[i].qty + normalized.qty;
    if (newQty > stockQuantity) {
      throw new Error(`Cannot add more than ${stockQuantity} items. Only ${stockQuantity - items[i].qty} more available.`);
    }
    items[i] = { ...items[i], qty: newQty, stockQuantity: stockQuantity };
  } else {
    if (normalized.qty > stockQuantity) {
      throw new Error(`Cannot add more than ${stockQuantity} items.`);
    }
    items.push(normalized);
  }
  saveCart(items);
  return items;
}

export function updateCartItemStock(productId, newStockQuantity) {
  const items = loadCart();
  const id = String(productId);
  const i = items.findIndex((x) => String(x.id) === id);
  
  if (i >= 0) {
    const newStock = Number(newStockQuantity || 1);
    const currentQty = items[i].qty;
    
    // If current quantity exceeds new stock, reduce it
    if (currentQty > newStock) {
      items[i] = { ...items[i], qty: newStock, stockQuantity: newStock };
    } else {
      items[i] = { ...items[i], stockQuantity: newStock };
    }
    
    saveCart(items);
  }
  
  return items;
}

export function canAddToCart(product, qty = 1) {
  const items = loadCart();
  const id = String(product.id);
  const stockQuantity = Number(product.stockQuantity || 1);
  
  const existingItem = items.find((x) => String(x.id) === id);
  if (existingItem) {
    return (existingItem.qty + qty) <= stockQuantity;
  }
  
  return qty <= stockQuantity;
}

export function getAvailableStock(product) {
  const items = loadCart();
  const id = String(product.id);
  const stockQuantity = Number(product.stockQuantity || 1);
  
  const existingItem = items.find((x) => String(x.id) === id);
  if (existingItem) {
    return Math.max(0, stockQuantity - existingItem.qty);
  }
  
  return stockQuantity;
}
