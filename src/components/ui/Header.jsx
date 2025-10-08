import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from './Button';
import { cn } from 'utils/cn';

const links = [
  { to: '/rural-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/scheme-navigator', label: 'Schemes', icon: 'Map' },
  { to: '/job-discovery-engine', label: 'Jobs', icon: 'Briefcase' },
  { to: '/help-and-support', label: 'Support', icon: 'LifeBuoy' }
];

export default function Header({ onToggleSidebar, sidebarVisible, collapsed }) {
  const { pathname } = useLocation();
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
          <Button variant="ghost" size="icon" aria-label="Notifications" iconName="Bell" />
          <Button variant="ghost" size="icon" aria-label="Profile" iconName="User" />
        </div>
      </div>
    </header>
  );
}

