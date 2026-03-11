import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useDashboardStore } from '../stores/dashboardStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useDashboardStore();

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative lg:flex lg:shrink-0 z-50 lg:z-auto
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        <TopNav />
        <main className="flex-1 overflow-y-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
