import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register new user
  const register = async (email, password, displayName, role = 'user') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName,
        role,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update last login
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { lastLogin: new Date().toISOString() }, { merge: true });

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Admin login (checks if user has admin role)
  const adminLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is admin
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || userDoc.data().role !== 'admin') {
        await signOut(auth);
        throw new Error('Unauthorized: Admin access required');
      }

      // Update last login
      await setDoc(userDocRef, { lastLogin: new Date().toISOString() }, { merge: true });

      return { success: true, user };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserRole(null);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  // Get user role from Firestore
  const getUserRole = async (uid) => {
    try {
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data().role || 'user';
      }
      return 'user';
    } catch (error) {
      console.error('Error fetching user role:', error);
      return 'user';
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid);
        setCurrentUser(user);
        setUserRole(role);
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    loading,
    error,
    register,
    login,
    adminLogin,
    logout,
    resetPassword,
    isAdmin: userRole === 'admin',
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
