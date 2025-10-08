import React, { useState } from 'react';
import Header from 'components/ui/Header';
import Sidebar from 'components/ui/Sidebar';
import { cn } from 'utils/cn';

/**
 * Global layout wrapper.
 * Props:
 *  - sidebar: boolean (show app sidebar navigation)
 *  - children: page content
 *  - className: optional main content wrapper class overrides
 */
export default function Layout({ sidebar = false, className, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Header onToggleSidebar={sidebar ? () => setCollapsed(c => !c) : undefined} sidebarVisible={sidebar} collapsed={collapsed} />
      <div className="flex w-full">
        {sidebar && (
          <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        )}
        <main
          className={cn(
            'flex-1 min-h-[calc(100vh-4rem)] pt-4 pb-10 px-4 sm:px-6 lg:px-8 transition-all duration-300',
            sidebar ? (collapsed ? 'lg:ml-16' : 'lg:ml-0') : '',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
