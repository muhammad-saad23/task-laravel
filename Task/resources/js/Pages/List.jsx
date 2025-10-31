import { User as UserIcon } from 'lucide-react';
import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function List({ Users }) {
  const { auth } = usePage().props; 
  const currentUser = auth.user;

  
  const filteredUsers =
    currentUser.role === 'admin'
      ? Users.filter((u) => u.role !== 'admin') 
      : currentUser.role === 'subadmin'
      ? Users.filter((u) => u.role === 'customer') 
      : [];

  return (
    <AuthenticatedLayout>
      <div className="max-w-3xl mx-auto p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">User List</h2>

        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredUsers.map((userItem) => (
              <li
                key={userItem.id}
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <UserIcon className="text-blue-600 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{userItem.name}</p>
                    <p className="text-sm text-gray-400">{userItem.email}</p>
                    <p className="text-sm text-gray-500">{userItem.phone}</p>
                    <p className="text-xs text-gray-400 italic">Role: {userItem.role}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    View
                  </button>

                  {currentUser.role === 'admin' && (
                    <div>
                    <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                      Delete
                    </button>
                         <span>
                          Customers: <strong>{userItem.customers_count || 0}</strong>
                        </span> 
                    </div>
                    
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
