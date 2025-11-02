import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Activity,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
} from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Link, router, usePage } from '@inertiajs/react';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      {/* Sidebar and Header */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 transition-all duration-300">
        {children}
      </main>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;
