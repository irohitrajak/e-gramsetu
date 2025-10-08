import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SchemeNavigator from './pages/scheme-navigator';
import AdminCommandCenter from './pages/admin-command-center';
import ProfileManagement from './pages/profile-management';
import JobDiscoveryEngine from './pages/job-discovery-engine';
import RuralDashboard from './pages/rural-dashboard';
import HelpAndSupport from './pages/help-and-support';
import Layout from 'components/Layout';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Layout sidebar><RuralDashboard /></Layout>} />
          <Route path="/rural-dashboard" element={<Layout sidebar><RuralDashboard /></Layout>} />
          <Route path="/scheme-navigator" element={<Layout sidebar><SchemeNavigator /></Layout>} />
          <Route path="/job-discovery-engine" element={<Layout sidebar><JobDiscoveryEngine /></Layout>} />
          <Route path="/profile-management" element={<Layout sidebar><ProfileManagement /></Layout>} />
          <Route path="/admin-command-center" element={<Layout sidebar><AdminCommandCenter /></Layout>} />
          <Route path="/help-and-support" element={<Layout sidebar={false}><HelpAndSupport /></Layout>} />
          <Route path="*" element={<Layout sidebar={false}><NotFound /></Layout>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
