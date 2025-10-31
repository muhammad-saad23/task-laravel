import React from 'react';
// import Sidebar from '@/Pages/Shared/Sidebar';
import { ClipboardCheck, FileText } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const SubadminDashboard = ({ auth }) => {
  return (
    
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* <Sidebar role="subadmin" /> */}

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Hello, {auth.user.name} 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <ClipboardCheck size={36} className="text-blue-500 mb-3" />
            <h3 className="text-lg font-semibold">Orders Processed</h3>
            <p className="text-2xl font-bold mt-2">128</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col items-center">
            <FileText size={36} className="text-emerald-500 mb-3" />
            <h3 className="text-lg font-semibold">Reports Generated</h3>
            <p className="text-2xl font-bold mt-2">12</p>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Activity Feed</h2>
          <ul className="space-y-3 text-gray-400">
            <li>📦 You updated order #1234</li>
            <li>📝 You added a product note</li>
          </ul>
        </div>
      </div>
    </div>
    
  );
};

export default SubadminDashboard;
