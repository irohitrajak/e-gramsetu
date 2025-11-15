import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from 'pages/login';
import AdminLogin from 'pages/admin-login';
import Register from 'pages/register';
import SchemeNavigator from './pages/scheme-navigator';
import AdminCommandCenter from './pages/admin-command-center';
import ProfileManagement from './pages/profile-management';
import JobDiscoveryEngine from './pages/job-discovery-engine';
import RuralDashboard from './pages/rural-dashboard';
import HelpAndSupport from './pages/help-and-support';
import Layout from 'components/Layout';
import ProtectedRoute from 'components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const Routes = () => {
  // When the app is served from a sub-path (Vite `base`), use that as the router basename
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public Routes */}
            <Route path="/login" element={<Layout sidebar={false}><Login /></Layout>} />
            <Route path="/register" element={<Layout sidebar={false}><Register /></Layout>} />
            <Route path="/admin-login" element={<Layout sidebar={false}><AdminLogin /></Layout>} />
            <Route path="/help-and-support" element={<Layout sidebar={false}><HelpAndSupport /></Layout>} />
            
            {/* Protected User Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout sidebar><RuralDashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/rural-dashboard" element={
              <ProtectedRoute>
                <Layout sidebar><RuralDashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/scheme-navigator" element={
              <ProtectedRoute>
                <Layout sidebar><SchemeNavigator /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/job-discovery-engine" element={
              <ProtectedRoute>
                <Layout sidebar><JobDiscoveryEngine /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile-management" element={
              <ProtectedRoute>
                <Layout sidebar><ProfileManagement /></Layout>
              </ProtectedRoute>
            } />
            
            {/* Protected Admin Routes */}
            <Route path="/admin-command-center" element={
              <ProtectedRoute requireAdmin>
                <Layout sidebar><AdminCommandCenter /></Layout>
              </ProtectedRoute>
            } />
            
            {/* 404 Not Found */}
            <Route path="*" element={<Layout sidebar={false}><NotFound /></Layout>} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
