# 🧹 Data Cleanup Guide

This guide explains how to clean up temporary data in the Second Hand Market app.

## 📁 What Gets Cleaned Up

The cleanup process removes all temporary data including:

- **User Favorites** - Items users have favorited
- **User Posts** - Items users have posted for sale
- **User Transactions** - Purchase history and payment records
- **User Reviews** - Reviews written by users
- **Cart Items** - Items in shopping cart
- **Authentication Data** - Login tokens and user sessions
- **Session Storage** - Browser session data
- **Cookies** - Any stored cookies

## 🚀 How to Clean Up Data

### Method 1: Browser Console (Recommended)

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Run one of these commands:

```javascript
// Complete cleanup (clears everything)
window.cleanupApp()

// Or use the alternative function
window.runCleanup()
```

### Method 2: Programmatic Cleanup

You can also import and use the cleanup functions in your code:

```javascript
import performCompleteCleanup from './utils/cleanupUtils';

// Complete cleanup
performCompleteCleanup();

// Or clean specific data types
import { 
  clearUserData, 
  clearCartData, 
  clearAuthData 
} from './utils/cleanupUtils';

clearUserData();    // Clear user posts, favorites, transactions, reviews
clearCartData();    // Clear shopping cart
clearAuthData();    // Clear authentication data
```

### Method 3: Automatic Cleanup (Optional)

To enable automatic cleanup when you close the browser tab:

1. Open `src/App.jsx`
2. Find this line: `// performCompleteCleanup();`
3. Remove the `//` to uncomment it
4. Save the file

**Note:** This will clear ALL data every time you close the browser tab.

## 🔄 What Happens After Cleanup

After running the cleanup:

1. **All temporary data is removed** from localStorage
2. **AuthStore is reset** to initial state
3. **Default test users are restored**:
   - Email: `test@example.com`, Password: `password123`
   - Email: `demo@example.com`, Password: `demo123`
4. **App returns to initial state** as if it was just installed

## 📋 Cleanup Functions Reference

### Complete Cleanup
```javascript
performCompleteCleanup()  // Clears everything
```

### Specific Cleanup Functions
```javascript
clearUserData()           // User posts, favorites, transactions, reviews
clearCartData()           // Shopping cart items
clearAuthData()           // Authentication tokens and user data
clearAllLocalStorage()    // All localStorage keys
clearAllUtilsData()       // All utils storage files
clearAuthStore()          // Reset authStore to initial state
```

## 🎯 When to Use Cleanup

Use the cleanup function when you want to:

- **Reset the app** to its initial state
- **Clear test data** after development/testing
- **Start fresh** with a clean slate
- **Remove sensitive data** before sharing your screen
- **Debug issues** by clearing corrupted data

## ⚠️ Important Notes

- **Data is permanently deleted** - Make sure you want to clear everything
- **Default users are restored** - You can always log in with the test accounts
- **No backup** - There's no way to recover cleared data
- **Browser-specific** - Data is only cleared in the current browser

## 🛠️ Development Tips

- Use `console.log` to see what's being cleared
- Check the browser's Application tab to verify data is removed
- Test the cleanup function regularly during development
- Consider backing up important test data before cleanup

## 🔧 Troubleshooting

If cleanup doesn't work:

1. **Check console errors** - Look for error messages
2. **Verify file imports** - Make sure cleanupUtils.js exists
3. **Check browser permissions** - Some browsers block localStorage access
4. **Try manual cleanup** - Use browser's Application tab to clear data manually

---

**Happy coding! 🚀**

