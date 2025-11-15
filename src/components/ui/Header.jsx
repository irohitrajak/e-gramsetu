import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from './Button';
import { cn } from 'utils/cn';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/rural-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/scheme-navigator', label: 'Schemes', icon: 'Map' },
  { to: '/job-discovery-engine', label: 'Jobs', icon: 'Briefcase' },
  { to: '/help-and-support', label: 'Support', icon: 'LifeBuoy' }
];

export default function Header({ onToggleSidebar, sidebarVisible, collapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentUser, userRole, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 flex items-center gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {sidebarVisible && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              onClick={onToggleSidebar}
              className="hidden lg:inline-flex"
              iconName={collapsed ? 'PanelRightOpen' : 'PanelLeft'}
            />
          )}
          <Link to="/" className="font-bold text-lg tracking-tight flex items-center gap-2">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold shadow">e</span>
            <span className="hidden sm:inline-block">GramSetu</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={cn('px-3 py-2 rounded-md flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors', pathname.startsWith(l.to) && 'bg-gray-200 dark:bg-gray-700 font-medium')}
            >
              <Icon name={l.icon} size={16} /> {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications" iconName="Bell" />
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {currentUser?.displayName?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {currentUser?.displayName || 'User'}
                    </p>
                    {userRole === 'admin' && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Admin</p>
                    )}
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {currentUser?.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                      {userRole === 'admin' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full font-semibold">
                          Admin
                        </span>
                      )}
                    </div>
                    <Link
                      to="/profile-management"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Icon name="User" size={16} />
                      Profile
                    </Link>
                    {userRole === 'admin' && (
                      <Link
                        to="/admin-command-center"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Icon name="Shield" size={16} />
                        Admin Center
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 border-t border-gray-200 dark:border-gray-700"
                    >
                      <Icon name="LogOut" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

