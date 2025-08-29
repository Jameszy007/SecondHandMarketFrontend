// Cleanup utilities for clearing temporary data when shutting down the project

import authStore from './authStore';
import { clearFavorites } from './favoritesStorage';
import { clearPosts } from './postsStorage';
import { clearTransactions } from './transactionStorage';
import { clearReviews } from './reviewsStorage';

// Clear all temporary data from localStorage
export function clearAllLocalStorage() {
  try {
    // Clear all storage keys used by the app
    const keysToClear = [
      'user_favorites',
      'user_posts', 
      'user_transactions',
      'user_reviews',
      'cart_items',
      'token',
      'user'
    ];

    keysToClear.forEach(key => {
      localStorage.removeItem(key);
    });

    console.log('✅ All localStorage data cleared');
  } catch (error) {
    console.error('❌ Error clearing localStorage:', error);
  }
}

// Clear all temporary data from utils storage files
export function clearAllUtilsData() {
  try {
    // Clear data from each storage utility
    clearFavorites();
    clearPosts();
    clearTransactions();
    clearReviews();
    
    console.log('✅ All utils storage data cleared');
  } catch (error) {
    console.error('❌ Error clearing utils data:', error);
  }
}

// Reset authStore to initial state
export function clearAuthStore() {
  try {
    authStore.clearAllData();
    console.log('✅ AuthStore reset to initial state');
  } catch (error) {
    console.error('❌ Error clearing authStore:', error);
  }
}

// Complete cleanup - clears everything
export function performCompleteCleanup() {
  console.log('🧹 Starting complete cleanup...');
  
  clearAllLocalStorage();
  clearAllUtilsData();
  clearAuthStore();
  
  console.log('🎉 Complete cleanup finished! All temporary data has been cleared.');
  console.log('📝 Note: Default test users (testuser, demo) have been restored.');
}

// Cleanup specific data types
export function clearUserData() {
  clearFavorites();
  clearPosts();
  clearTransactions();
  clearReviews();
  console.log('✅ User-specific data cleared');
}

export function clearCartData() {
  localStorage.removeItem('cart_items');
  console.log('✅ Cart data cleared');
}

export function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  clearAuthStore();
  console.log('✅ Authentication data cleared');
}

// Export cleanup function for easy access
export default performCompleteCleanup;
