import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { cn } from 'utils/cn';

const links = [
  { to: '/rural-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { to: '/scheme-navigator', label: 'Schemes', icon: 'Map' },
  { to: '/job-discovery-engine', label: 'Jobs', icon: 'Briefcase' },
  { to: '/profile-management', label: 'Profile', icon: 'User' },
  { to: '/admin-command-center', label: 'Admin', icon: 'Shield' },
  { to: '/help-and-support', label: 'Support', icon: 'LifeBuoy' }
];

export default function Sidebar({ collapsed = false, onToggle }) {
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 h-[calc(100vh-4rem)] sticky top-16 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <nav className="flex-1 overflow-y-auto py-4 text-sm space-y-1">
        {links.map(l => {
          const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to));
          return (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                'mx-2 flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group',
                active && 'bg-gray-200 dark:bg-gray-700 font-medium'
              )}
              title={collapsed ? l.label : undefined}
            >
              <Icon name={l.icon} size={18} className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300" />
              {!collapsed && <span className="truncate">{l.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-2 border-t border-gray-200 dark:border-gray-800 flex items-center justify-center">
        <button
          onClick={onToggle}
          className="w-full text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {collapsed ? 'Expand »' : '« Collapse'}
        </button>
      </div>
    </aside>
  );
}

