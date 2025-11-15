import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Can also check for specific roles (e.g., admin)
 */
export const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, userRole, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6fbf9] dark:bg-[#071012]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to admin login if admin access is required but user is not admin
  if (requireAdmin && userRole !== 'admin') {
    return <Navigate to="/admin-login" replace />;
  }

  // Render the protected content
  return children;
};

export default ProtectedRoute;
