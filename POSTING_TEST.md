# PostingPage Test Guide

## Overview
The PostingPage has been updated to use Ant Design components and integrated with the useAuth hook for user authentication.

## Features to Test

### 1. Form Validation
- [ ] Item Name field is required
- [ ] Description field is required  
- [ ] Category selection is required
- [ ] Condition selection is required
- [ ] Price field is required
- [ ] Pickup Location selection is required

### 2. Form Functionality
- [ ] All form fields accept input correctly
- [ ] Category dropdown shows: Electronics, Furniture, Clothing, Books
- [ ] Condition dropdown shows: New, Like New, Used
- [ ] Pickup Location dropdown shows: New York, Los Angeles, Chicago
- [ ] Price and Original Price accept numeric input
- [ ] Description textarea allows multi-line input

### 3. Photo Upload
- [ ] Photo upload button is visible
- [ ] Can select multiple images (up to 6)
- [ ] Only image files are accepted
- [ ] Uploaded images are displayed in preview

### 4. Delivery Methods
- [ ] Meet-up checkbox can be toggled
- [ ] Delivery checkbox can be toggled
- [ ] Both checkboxes can be selected simultaneously

### 5. Tags System
- [ ] Can add new tags by typing and clicking "Add" button
- [ ] Can add tags by pressing Enter key
- [ ] Tags are displayed as blue tags
- [ ] Can remove tags by clicking the X button
- [ ] Empty tags cannot be added

### 6. Contact Information
- [ ] Email field shows user's email from authentication (if logged in)
- [ ] Email field is read-only
- [ ] Phone field shows default number
- [ ] Phone field is read-only

### 7. Form Submission
- [ ] Submit button is visible and styled correctly
- [ ] Form validation prevents submission with missing required fields
- [ ] Successful submission shows success message
- [ ] Form resets after successful submission
- [ ] Console logs the submitted data

### 8. Authentication Integration
- [ ] User email is automatically populated from useAuth hook
- [ ] Page works correctly when user is authenticated
- [ ] Page works correctly when user is not authenticated

### 9. Navigation
- [ ] "Create Post" button appears in HomeBar when authenticated
- [ ] "Create Post" option appears in user dropdown menu
- [ ] Navigation to /posting route works correctly

## Test Steps

1. **Start the development server:**
   ```bash
   cd second-hand-market-frontend
   npm run dev
   ```

2. **Access the application:**
   - Open browser to http://localhost:5173
   - Login with test credentials:
     - Email: test@example.com
     - Password: password123

3. **Navigate to PostingPage:**
   - Click "Create Post" button in HomeBar, OR
   - Click user avatar → "Create Post" from dropdown

4. **Test form validation:**
   - Try submitting empty form
   - Verify error messages appear for required fields

5. **Test form functionality:**
   - Fill in all required fields
   - Test dropdown selections
   - Test photo upload
   - Test delivery method checkboxes
   - Test tags system

6. **Test form submission:**
   - Submit complete form
   - Verify success message
   - Verify form resets
   - Check browser console for logged data

## Expected Results

- All form fields should work correctly
- Validation should prevent submission with missing required fields
- Success message should appear on successful submission
- Form should reset after submission
- User email should be automatically populated
- Navigation should work smoothly

## Known Issues

- None currently identified

## Browser Compatibility

Tested on:
- Chrome (recommended)
- Firefox
- Safari
- Edge
