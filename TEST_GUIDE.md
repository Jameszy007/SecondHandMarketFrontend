# 🔐 Mock Authentication Test Guide

## **How to Test Login/Register Without Backend**

### **✅ Pre-configured Test Accounts**

You can use these accounts to test login functionality:

#### **Account 1:**
- **Email:** `test@example.com`
- **Password:** `password123`
- **Username:** `testuser`

#### **Account 2:**
- **Email:** `demo@example.com`
- **Password:** `demo123`
- **Username:** `demo`

### **🧪 Testing Scenarios**

#### **1. Login with Existing Account**
1. Go to `/login` or click "Login" button
2. Use one of the pre-configured accounts above
3. Click "Login"
4. Should see success message and redirect to profile

#### **2. Register New Account**
1. Go to `/register` or click "Register" button
2. Fill in new username, email, and password
3. Click "Sign Up"
4. Should see success message and auto-login

#### **3. Test Authentication Protection**
1. **Without logging in:**
   - Try to click "Favorite" button → Should redirect to login
   - Try to click "Post" button → Should redirect to login
   - Try to access `/favorites` → Should redirect to login

2. **After logging in:**
   - All protected features should work normally
   - Should be redirected back to original destination

#### **4. Test Error Handling**
1. **Login with wrong password:**
   - Use correct email but wrong password
   - Should see error message

2. **Register with existing email:**
   - Try to register with `test@example.com`
   - Should see "User already exists" error

### **🔧 How It Works**

#### **Mock Database:**
- Users are stored in `localStorage` under `mockUsers`
- Tokens are stored in `localStorage` under `token`
- Data persists between browser sessions

#### **Simulated API:**
- 1-second delay to simulate network request
- Proper error handling for invalid credentials
- Duplicate email checking for registration

#### **Authentication Flow:**
1. User submits login/register form
2. Mock service validates credentials
3. Success: Store token and redirect
4. Error: Show error message

### **🔄 Reset Mock Data**

To clear all mock data and start fresh:
```javascript
// Run in browser console
localStorage.removeItem("mockUsers");
localStorage.removeItem("token");
localStorage.removeItem("user");
```

### **📝 Test Checklist**

- [ ] Login with existing account
- [ ] Register new account
- [ ] Login with wrong credentials (error handling)
- [ ] Register with existing email (error handling)
- [ ] Test authentication protection on favorite button
- [ ] Test authentication protection on post button
- [ ] Test redirect after login
- [ ] Test logout functionality
- [ ] Test data persistence (refresh page after login)

### **🚀 Ready to Test!**

Your mock authentication system is now fully functional. You can test all login/register features without needing a backend!



