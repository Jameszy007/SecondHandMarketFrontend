# Payment System Test Guide

## 🎯 What's New

### 1. **ListingPage Search Bar Updated**
- ✅ **Same design as HomePage** - consistent search bar with action buttons
- ✅ **Action buttons** - Favorites, Cart, Post Item (with authentication)
- ✅ **Responsive layout** - works on mobile and desktop

### 2. **Mock Payment System**
- ✅ **Real payment flow** - Credit, Debit, PayPal options
- ✅ **Transaction storage** - payments saved to localStorage
- ✅ **Cart integration** - cart clears after successful payment
- ✅ **Transaction history** - shows in profile page

## 🧪 How to Test

### **Step 1: Test Search Bar**
1. Go to **Listing page** (`/items`)
2. **Verify search bar** looks same as HomePage
3. **Test action buttons** (Favorites, Cart, Post)
4. **Test authentication** - buttons should redirect to login if not authenticated

### **Step 2: Test Payment System**

#### **A. Add Items to Cart**
1. **Login** with any account (testuser/password123 or demo/demo123)
2. Go to **HomePage** or **Listing page**
3. **Click on items** to add them to cart
4. **Go to Cart** (`/cart`) to see items

#### **B. Test Payment Methods**

**Credit Card Payment:**
- Select **Credit** payment method
- Fill in test data:
  - Card Number: `1234 5678 9012 3456`
  - Name: `JASON ZHAO`
  - Expiry: `12/25`
  - CVV: `123`

**Debit Card Payment:**
- Select **Debit** payment method
- Use same test data as above

**PayPal Payment:**
- Select **PayPal** payment method
- Email: `test@example.com`

#### **C. Test Fulfillment Options**
- **Pickup** (Free)
- **Delivery** (+$10 fee)

#### **D. Complete Payment**
1. **Fill payment form** with test data
2. **Click "Pay Now"**
3. **Verify success message**
4. **Check cart is cleared**

### **Step 3: Verify Transaction History**

#### **A. Check Profile Page**
1. Go to **Profile page** (`/profile`)
2. Click **Transactions tab**
3. **Verify transaction appears** with:
   - Order ID
   - Date and time
   - Item details
   - Payment method
   - Total amount
   - Status (Completed)

#### **B. Transaction Details**
Each transaction should show:
- ✅ **Order number**
- ✅ **Purchase date/time**
- ✅ **Item images and names**
- ✅ **Payment method** (with icon)
- ✅ **Fulfillment method**
- ✅ **Price breakdown** (subtotal, delivery, total)
- ✅ **Status tag** (Completed)
- ✅ **Add Review button**

## 🔧 Test Data

### **Valid Payment Data:**
```
Credit/Debit Card:
- Number: 1234 5678 9012 3456
- Name: JASON ZHAO
- Expiry: 12/25
- CVV: 123

PayPal:
- Email: test@example.com
```

### **Test Accounts:**
```
Account 1:
- Email: test@example.com
- Password: password123

Account 2:
- Email: demo@example.com
- Password: demo123
```

## 🐛 Troubleshooting

### **Payment Fails:**
- ✅ Check all fields are filled
- ✅ Verify card number is exactly 16 digits
- ✅ Ensure expiry is MM/YY format
- ✅ CVV must be 3 digits
- ✅ Must be logged in

### **Transaction Not Showing:**
- ✅ Refresh profile page
- ✅ Check you're logged in with correct account
- ✅ Verify payment was successful
- ✅ Check browser console for errors

### **Cart Issues:**
- ✅ Cart should clear after successful payment
- ✅ Items should persist until payment
- ✅ Quantity changes should work

## 🎉 Success Indicators

### **Payment Success:**
- ✅ Success message appears
- ✅ Redirects to success page
- ✅ Cart is empty
- ✅ Transaction appears in profile

### **Transaction Display:**
- ✅ Shows in profile transactions tab
- ✅ All payment details visible
- ✅ Correct amounts displayed
- ✅ Status shows "Completed"

## 📝 Notes

- **Data persists** in localStorage
- **Multiple payments** can be made
- **Transaction history** is user-specific
- **Cart clears** after each successful payment
- **Search bar** now matches HomePage design

Happy testing! 🚀
