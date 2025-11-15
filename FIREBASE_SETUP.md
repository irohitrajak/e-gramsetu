# Firebase Authentication Setup Guide

This guide will help you configure Firebase authentication for the e-GramSetu application with separate user and admin login panels.

## 🔥 Firebase Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project
4. Enable Google Analytics (optional)

### Step 2: Enable Authentication

1. In the Firebase Console, select your project
2. Navigate to **Build** → **Authentication**
3. Click **Get Started**
4. Go to **Sign-in method** tab
5. Enable **Email/Password** authentication
6. Click **Save**

### Step 3: Create Firestore Database

1. Navigate to **Build** → **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Start in production mode**
4. Select a Cloud Firestore location
5. Click **Enable**

### Step 4: Set Firestore Security Rules

Go to the **Rules** tab in Firestore and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      // Admins can read all users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Step 5: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to **Project Overview**
2. Select **Project settings**
3. Scroll down to **Your apps** section
4. Click the **Web** icon (`</>`) to add a web app
5. Register your app with a nickname (e.g., "e-GramSetu")
6. Copy the Firebase configuration object

### Step 6: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

3. Save the file and restart your development server

## 👥 Creating Users

### Create a Regular User

You can create regular users in two ways:

#### Option 1: Using Firebase Console
1. Go to **Authentication** → **Users** tab
2. Click **Add user**
3. Enter email and password
4. The user will automatically have the 'user' role

#### Option 2: Register through the app
1. Start your development server: `npm start`
2. Navigate to `/login`
3. Click "Create account"
4. Fill in the registration form

### Create an Admin User

To create an admin user, you need to manually set the role in Firestore:

1. First, create a user using either method above
2. Go to **Firestore Database** in Firebase Console
3. Navigate to the `users` collection
4. Find the user document (identified by UID)
5. Edit the document and add/update the `role` field to `"admin"`
6. Save the changes

Alternatively, you can create a user document manually:
```javascript
{
  email: "admin@example.com",
  displayName: "Admin User",
  role: "admin",
  createdAt: "2025-01-01T00:00:00.000Z",
  lastLogin: "2025-01-01T00:00:00.000Z"
}
```

## 🔐 Login Panels

### User Login
- **URL**: `/login`
- **Access**: All registered users
- **Redirect**: After successful login, users are redirected to `/rural-dashboard`

### Admin Login
- **URL**: `/admin-login`
- **Access**: Only users with `role: "admin"` in Firestore
- **Redirect**: After successful login, admins are redirected to `/admin-command-center`
- **Security**: The admin login verifies the user's role before granting access

## 🛡️ Protected Routes

The following routes are protected and require authentication:

### User Routes (require authentication)
- `/` (Home)
- `/rural-dashboard`
- `/scheme-navigator`
- `/job-discovery-engine`
- `/profile-management`

### Admin Routes (require admin role)
- `/admin-command-center`

### Public Routes (no authentication required)
- `/login`
- `/admin-login`
- `/help-and-support`

## 🚀 Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Access the application:
- User Login: http://localhost:5173/login
- Admin Login: http://localhost:5173/admin-login

## 📝 Features

### Authentication Context (`AuthContext`)
- Global authentication state management
- User and admin login methods
- User registration
- Password reset
- Role-based access control

### Protected Routes (`ProtectedRoute`)
- Automatic redirect to login for unauthenticated users
- Role-based route protection
- Loading states during authentication check

### User Profile Display
- User avatar in header
- Display name and email
- Role badge for admins
- Dropdown menu with profile and logout options

## 🔒 Security Best Practices

1. **Never commit `.env` file**: The `.env` file is already in `.gitignore`
2. **Use environment variables**: All sensitive Firebase config is stored in environment variables
3. **Firestore Security Rules**: Properly configure Firestore rules to restrict data access
4. **Admin verification**: Admin login verifies the user's role in Firestore before granting access
5. **HTTPS in production**: Always use HTTPS in production environments

## 🐛 Troubleshooting

### "Firebase configuration error"
- Verify all environment variables are set correctly in `.env`
- Restart the development server after updating `.env`

### "Unauthorized: Admin access required"
- Check that the user has `role: "admin"` in their Firestore document
- Verify Firestore security rules are properly configured

### "Firebase: Error (auth/network-request-failed)"
- Check your internet connection
- Verify Firebase project is active and not disabled

### User menu not closing on click
- Click outside the menu to close it
- This is expected behavior - the menu toggles on button click

## 📚 Additional Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Firebase Console for any errors
3. Check browser console for error messages
4. Verify all dependencies are installed correctly
