import React from 'react';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Activity,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { Link, router } from '@inertiajs/react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, link: route('dashboard'), active: route().current('dashboard') },
    { name: 'Users', icon: Users, link: route('list'), active: route().current('list') },
    { name: 'Products', icon: ShoppingCart, link: '/products' },
    { name: 'Analytics', icon: Activity, link: '/analytics' },
    { name: 'Settings', icon: Settings, link: '/settings' },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    router.post(route('user.logout.destroy'));
  };

  const NavLink = ({ name, icon: Icon, link, active }) => (
    <Link
      href={link}
      className={`flex items-center w-full p-3 rounded-lg transition duration-200 ease-in-out text-left ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className={!isOpen ? 'hidden lg:inline' : 'inline'}>{name}</span>
    </Link>
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
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 text-red-400 hover:bg-gray-700 rounded-lg transition duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className={!isOpen ? 'hidden lg:inline' : 'inline'}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
