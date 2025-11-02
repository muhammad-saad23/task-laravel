import React from 'react';
// import Sidebar from '@/Pages/Shared/Sidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BarChart3, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { usePage } from '@inertiajs/react';

const AdminDashboard = ({ auth,}) => {
  const { totalUsers,customers,totalCustomers } = usePage().props;
  const user = auth.user;
  // const totalUsers = auth.length || 0;

  return (
    
    <div className="flex min-h-screen text-gray-100">      

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <Users size={36} className="text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold">Total Subadmins</h3>
            <p className="text-2xl font-bold mt-2">{totalUsers||0}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <ShoppingBag size={36} className="text-green-500 mb-3" />
            <h3 className="text-lg font-semibold">Total Customers</h3>
            <p className="text-2xl font-bold mt-2">{totalCustomers||0}</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <BarChart3 size={36} className="text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-2xl font-bold mt-2">78</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <DollarSign size={36} className="text-emerald-500 mb-3" />
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-2xl font-bold mt-2">$4,560</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-gray-400">
            <li>🟢 New user <b>Ali Khan</b> registered</li>
            <li>🟠 Product <b>“Wireless Headphones”</b> updated</li>
            <li>🔵 Subadmin <b>Sarah</b> approved an order</li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default AdminDashboard;
