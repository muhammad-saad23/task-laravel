import React from 'react';
import { Menu } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const Header = ({ toggleSidebar }) => {
     const { auth } = usePage().props;
     const user = auth.user;
    return (
  <header className="sticky top-0 z-20 bg-gray-900 border-b border-gray-700 shadow-md p-4 flex justify-between items-center lg:pl-64">
    <button className="text-gray-400 hover:text-white lg:hidden" onClick={toggleSidebar}>
      <Menu className="w-6 h-6" />
    </button>
    <h2 className="text-2xl font-semibold text-white hidden mx-5 sm:block">
      Dashboard Overview
    </h2>
    <div className="flex items-center space-x-4">
      <div className="text-gray-400 capitalize" >{user.role}, {user.name}</div>
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        AD
      </div>
    </div>
  </header>
    )
};

export default Header;
