# 🔐 Firebase Authentication - Quick Reference

## 📋 Implementation Summary

### ✅ What Has Been Added

1. **Firebase Integration**
   - Firebase SDK installed
   - Configuration file created (`src/config/firebase.js`)
   - Environment variables added to `.env`

2. **Authentication System**
   - `AuthContext` for global auth state management
   - User and Admin login methods
   - User registration
   - Role-based access control

3. **Pages Created**
   - `/login` - User login panel
   - `/admin-login` - Admin login panel (with role verification)
   - `/register` - User registration page

4. **Protected Routes**
   - `ProtectedRoute` component for route protection
   - All main pages protected (require authentication)
   - Admin Command Center requires admin role

5. **UI Enhancements**
   - User profile dropdown in Header
   - Avatar display with initials
   - Admin badge for admin users
   - Logout functionality

## 🚀 Quick Start

### 1. Configure Firebase (REQUIRED)

Update `.env` with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 2. Enable Firebase Authentication

1. Go to Firebase Console
2. Enable Email/Password authentication
3. Create Firestore Database
4. Update Firestore security rules

### 3. Create Test Users

**Regular User:**
- Email: `user@example.com`
- Password: `password123`
- Role: `user` (automatic)

**Admin User:**
1. Create user normally
2. In Firestore, update the user document:
   ```json
   {
     "role": "admin"
   }
   ```

## 🎯 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | User login |
| `/register` | Public | User registration |
| `/admin-login` | Public | Admin login (role verified) |
| `/rural-dashboard` | Protected | Main dashboard (user) |
| `/scheme-navigator` | Protected | Schemes page (user) |
| `/job-discovery-engine` | Protected | Jobs page (user) |
| `/profile-management` | Protected | User profile (user) |
| `/admin-command-center` | Protected (Admin) | Admin dashboard |
| `/help-and-support` | Public | Help and support |

## 🔑 Key Components

### AuthContext
```javascript
import { useAuth } from '../context/AuthContext';

const { 
  currentUser,      // Current authenticated user
  userRole,         // User's role ('user' or 'admin')
  isAdmin,          // Boolean: is user admin?
  isAuthenticated,  // Boolean: is user logged in?
  login,            // Login function
  adminLogin,       // Admin login function
  logout,           // Logout function
  register          // Register function
} = useAuth();
```

### ProtectedRoute
```javascript
// Protect a route (require authentication)
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>

// Protect a route (require admin)
<ProtectedRoute requireAdmin>
  <AdminComponent />
</ProtectedRoute>
```

## 🧪 Testing

### Test User Login
1. Navigate to http://localhost:5173/register
2. Create a new account
3. You'll be redirected to the dashboard

### Test Admin Login
1. Create a user account
2. Update Firestore user document: set `role: "admin"`
3. Navigate to http://localhost:5173/admin-login
4. Login with admin credentials
5. You'll be redirected to admin command center

### Test Protected Routes
1. Try accessing `/rural-dashboard` without logging in
2. You should be redirected to `/login`
3. After login, you can access the dashboard

### Test Admin Authorization
1. Login as regular user
2. Try accessing `/admin-command-center`
3. You should be redirected to `/admin-login`

## 🛠️ Available Auth Functions

```javascript
// Login as regular user
const result = await login(email, password);

// Login as admin (verifies role)
const result = await adminLogin(email, password);

// Register new user
const result = await register(email, password, displayName, role);

// Logout
const result = await logout();

// Reset password
const result = await resetPassword(email);
```

All functions return:
```javascript
{
  success: true/false,
  error: "error message" // if success is false
}
```

## 📁 File Structure

```
src/
├── config/
│   └── firebase.js              # Firebase configuration
├── context/
│   └── AuthContext.jsx          # Authentication context
├── components/
│   ├── ProtectedRoute.jsx       # Route protection component
│   └── ui/
│       └── Header.jsx           # Updated with user menu
└── pages/
    ├── login/
    │   └── index.jsx            # User login page
    ├── register/
    │   └── index.jsx            # User registration page
    └── admin-login/
        └── index.jsx            # Admin login page
```

## 🎨 UI Features

### User Menu (Header)
- Displays user avatar with initials
- Shows user name and email
- Admin badge for admin users
- Quick links to:
  - Profile Management
  - Admin Center (admins only)
  - Logout

### Login Panels
- **User Login**: Clean, user-friendly design
- **Admin Login**: Distinctive purple theme with security indicators
- Both include:
  - Email/password validation
  - Show/hide password
  - Error handling
  - Loading states
  - Success messages

## 🔒 Security Features

- ✅ Environment variables for sensitive config
- ✅ Role-based access control
- ✅ Protected routes with redirects
- ✅ Admin role verification in Firestore
- ✅ Secure password handling (min 6 chars)
- ✅ Authentication state persistence
- ✅ Firestore security rules

## 📚 Documentation

For detailed setup instructions, see:
- `FIREBASE_SETUP.md` - Complete Firebase setup guide

## 🆘 Common Issues

**Issue:** "Firebase configuration error"
**Solution:** Check that all environment variables in `.env` are set

**Issue:** "Unauthorized: Admin access required"
**Solution:** Verify user has `role: "admin"` in Firestore

**Issue:** Can't login after registration
**Solution:** Check Firebase Console for the user account

**Issue:** Routes not protected
**Solution:** Make sure `AuthProvider` wraps your routes in `Routes.jsx`

## ✨ Next Steps

1. ✅ Configure Firebase in `.env`
2. ✅ Enable Authentication in Firebase Console
3. ✅ Create Firestore database
4. ✅ Set up Firestore security rules
5. ✅ Create test users (regular and admin)
6. ✅ Test login flows
7. ✅ Deploy to production

---

**Need Help?** Check `FIREBASE_SETUP.md` for detailed instructions!
