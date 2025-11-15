# Firebase Setup Checklist ✅

Use this checklist to ensure you've completed all necessary steps for Firebase authentication.

## 📋 Firebase Console Setup

### 1. Create Firebase Project
- [ ] Go to [Firebase Console](https://console.firebase.google.com/)
- [ ] Create new project or select existing one
- [ ] Project name: ___________________
- [ ] Enable/Disable Google Analytics (your choice)

### 2. Enable Authentication
- [ ] Navigate to **Build** → **Authentication**
- [ ] Click **Get Started**
- [ ] Go to **Sign-in method** tab
- [ ] Enable **Email/Password**
- [ ] Save changes

### 3. Create Firestore Database
- [ ] Navigate to **Build** → **Firestore Database**
- [ ] Click **Create database**
- [ ] Select location: ___________________
- [ ] Choose mode:
  - [ ] Test mode (for development)
  - [ ] Production mode (for production)
- [ ] Click **Enable**

### 4. Set Security Rules
- [ ] Go to **Rules** tab in Firestore
- [ ] Copy rules from `FIREBASE_SETUP.md`
- [ ] Publish rules
- [ ] Test rules (optional)

### 5. Register Web App
- [ ] Click gear icon ⚙️ → **Project settings**
- [ ] Scroll to **Your apps**
- [ ] Click Web icon `</>`
- [ ] App nickname: e-GramSetu (or your choice)
- [ ] Register app
- [ ] Copy configuration values

## 🔧 Local Project Setup

### 6. Update Environment Variables
- [ ] Open `.env` file in project root
- [ ] Fill in these values from Firebase config:
  ```
  ✅ VITE_FIREBASE_API_KEY
  ✅ VITE_FIREBASE_AUTH_DOMAIN
  ✅ VITE_FIREBASE_PROJECT_ID
  ✅ VITE_FIREBASE_STORAGE_BUCKET
  ✅ VITE_FIREBASE_MESSAGING_SENDER_ID
  ✅ VITE_FIREBASE_APP_ID
  ✅ VITE_FIREBASE_MEASUREMENT_ID
  ```
- [ ] Save `.env` file
- [ ] Restart development server

### 7. Test Connection
- [ ] Run `npm start`
- [ ] Check browser console for errors
- [ ] Look for Firebase initialization messages

## 👥 User Setup

### 8. Create Test Users

#### Regular User
- [ ] Navigate to `/register` in your app
- [ ] Create account with:
  - Name: ___________________
  - Email: ___________________
  - Password: ___________________ (min 6 chars)
- [ ] Verify account created in Firebase Console
- [ ] Test login at `/login`

#### Admin User (Method 1: Console)
- [ ] Go to Firebase Console → **Authentication**
- [ ] Click **Add user**
- [ ] Email: ___________________
- [ ] Password: ___________________
- [ ] Note the User UID: ___________________
- [ ] Go to **Firestore Database**
- [ ] Create document in `users` collection
- [ ] Document ID: [User UID from above]
- [ ] Add fields:
  ```
  ✅ email: [admin email]
  ✅ displayName: "Admin User"
  ✅ role: "admin"
  ✅ createdAt: [current timestamp]
  ✅ lastLogin: [current timestamp]
  ```
- [ ] Save document

#### Admin User (Method 2: Register then Upgrade)
- [ ] Register user normally at `/register`
- [ ] Go to Firestore Database in Firebase Console
- [ ] Find user in `users` collection
- [ ] Edit document
- [ ] Change `role` from "user" to "admin"
- [ ] Save changes

## 🧪 Testing

### 9. Test User Authentication
- [ ] Visit `/login`
- [ ] Enter regular user credentials
- [ ] Verify redirect to `/rural-dashboard`
- [ ] Check user menu in header
- [ ] Test logout functionality

### 10. Test Admin Authentication
- [ ] Visit `/admin-login`
- [ ] Enter admin credentials
- [ ] Verify redirect to `/admin-command-center`
- [ ] Check admin badge in header
- [ ] Test access to admin sections

### 11. Test Protected Routes
- [ ] Log out completely
- [ ] Try to access `/rural-dashboard`
- [ ] Verify redirect to `/login`
- [ ] Login and try again
- [ ] Verify access granted

### 12. Test Admin Access Control
- [ ] Login as regular user
- [ ] Try to access `/admin-command-center`
- [ ] Verify redirect to `/admin-login`
- [ ] Logout and login as admin
- [ ] Verify access granted

## 🔒 Security Verification

### 13. Security Rules
- [ ] Test that users can only read their own data
- [ ] Test that admins can read all user data
- [ ] Test that unauthenticated users cannot access Firestore
- [ ] Verify Firebase Console shows no security warnings

### 14. Environment Variables
- [ ] Verify `.env` is in `.gitignore`
- [ ] Never commit `.env` to git
- [ ] Use different Firebase projects for dev/prod

## 📱 Production Preparation

### 15. Production Firebase Project
- [ ] Create separate Firebase project for production
- [ ] Repeat steps 1-5 for production project
- [ ] Set up production environment variables
- [ ] Configure authorized domains in Firebase Console
- [ ] Update security rules for production

### 16. Deploy Preparation
- [ ] Set production Firebase config in deployment environment
- [ ] Test authentication in production environment
- [ ] Set up Firebase Auth domain restrictions (optional)
- [ ] Enable email verification (optional)

## ✅ Completion

### Final Checks
- [ ] All environment variables set correctly
- [ ] At least one regular user created and tested
- [ ] At least one admin user created and tested
- [ ] All login flows working
- [ ] Protected routes functioning
- [ ] Admin access control working
- [ ] User menu displaying correctly
- [ ] Logout functionality working
- [ ] No console errors related to Firebase

---

## 🆘 Troubleshooting

If any step fails, refer to:
- `FIREBASE_SETUP.md` - Detailed instructions
- `AUTHENTICATION_GUIDE.md` - Quick reference
- Firebase Console error messages
- Browser console error messages

## 📝 Notes

Add any project-specific notes here:
- Firebase Project ID: ___________________
- Production URL: ___________________
- Test User Emails: ___________________
- Special Configuration: ___________________

---

**Setup Complete!** 🎉

Date Completed: ___________________
Completed By: ___________________
