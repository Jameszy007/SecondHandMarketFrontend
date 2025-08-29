# 🔍 Authentication Debug Guide

## **Quick Fix Steps:**

### **1. Clear Browser Data**
Open browser console (F12) and run:
```javascript
localStorage.clear();
location.reload();
```

### **2. Test Pre-configured Accounts**
Use these exact credentials:

**Account 1:**
- Email: `test@example.com`
- Password: `password123`

**Account 2:**
- Email: `demo@example.com`
- Password: `demo123`

### **3. Check Console for Debug Info**
After login attempt, check browser console for:
- "Login successful for: [email]"
- "Token stored: [token]"
- Any error messages

### **4. Verify localStorage**
In browser console, check:
```javascript
console.log("Token:", localStorage.getItem("token"));
console.log("User:", localStorage.getItem("user"));
console.log("MockUsers:", localStorage.getItem("mockUsers"));
```

### **5. Manual Login Test**
In browser console:
```javascript
// Simulate login
localStorage.setItem("token", "mock-jwt-token-123");
localStorage.setItem("user", JSON.stringify({
  id: 1,
  username: "testuser",
  email: "test@example.com"
}));

// Trigger auth change event
window.dispatchEvent(new Event('authChanged'));

// Refresh page
location.reload();
```

## **Expected Behavior:**

### **After Successful Login:**
1. ✅ Success message appears
2. ✅ Header changes from "Login/Register" to user avatar
3. ✅ Redirect to profile page or original destination
4. ✅ Favorite/Post buttons work normally

### **If Still Not Working:**
1. Check browser console for errors
2. Try different browser or incognito mode
3. Clear all browser data and try again

## **Common Issues:**

### **Issue: No redirect after login**
**Solution:** Check if there are JavaScript errors in console

### **Issue: Header doesn't update**
**Solution:** The auth change event should trigger automatically

### **Issue: Can't access profile page**
**Solution:** Make sure you're logged in first, then try `/profile`

## **Test Checklist:**
- [ ] Clear browser data
- [ ] Try login with test@example.com / password123
- [ ] Check console for success messages
- [ ] Verify header changes to avatar
- [ ] Try accessing profile page
- [ ] Test favorite/post buttons



