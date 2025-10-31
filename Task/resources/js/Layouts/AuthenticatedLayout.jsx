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
import { router } from '@inertiajs/react';


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Users', icon: Users },
    { name: 'Products', icon: ShoppingCart },
    { name: 'Analytics', icon: Activity },
    { name: 'Settings', icon: Settings },
  ];
  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route('user.logout.destroy'));
  };

  const NavLink = ({ name, icon: Icon }) => (
    <button
      onClick={() => setActiveItem(name)}
      className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out text-left ${
        activeItem === name
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className={!isOpen ? 'hidden lg:inline' : 'inline'}>{name}</span>
    </button>
  );

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900 z-30 p-4 border-r border-gray-700 flex flex-col ${
        isOpen ? 'w-64' : 'w-20'
      } lg:w-64`}
    >
      {/* Logo / Title */}
      <div className="flex items-center justify-between mb-8">
        <h1
          className={`text-2xl font-extrabold text-white transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'hidden lg:block lg:opacity-100'
          }`}
        >
          FusionDash
        </h1>
        <button
          className="text-gray-400 hover:text-white lg:hidden"
          onClick={toggleSidebar}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavLink key={item.name} {...item} />
        ))}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t border-gray-700">
        <button className="flex items-center w-full p-3 text-red-400 hover:bg-gray-700 rounded-lg transition duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <a href="#" onClick={handleLogout} className="block w-full text-left">
            <span className={!isOpen ? 'hidden lg:inline' : 'inline'}>Logout</span>
          </a>
        </button>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }) => (
  <header className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700 shadow-md p-4 flex justify-between items-center lg:pl-64">
    <button className="text-gray-400 hover:text-white lg:hidden" onClick={toggleSidebar}>
      <Menu className="w-6 h-6" />
    </button>
    <h2 className="text-2xl font-semibold text-white hidden sm:block">
      Dashboard Overview
    </h2>
    <div className="flex items-center space-x-4">
      <div className="text-gray-400">Welcome, Admin</div>
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        AD
      </div>
    </div>
  </header>
);

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
