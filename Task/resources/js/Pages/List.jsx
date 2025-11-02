import React from 'react';
import { usePage } from '@inertiajs/react';
import { User as UserIcon, Users as UsersIcon } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function List({ Users = [], Subadmins = [], viewMode }) {
  const { auth } = usePage().props;
  const currentUser = auth.user;

  return (
    <AuthenticatedLayout>
      <div className="max-w-5xl mx-auto p-6 text-white">

        {/* Subadmin View */}
        {viewMode === 'subadmin' && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Added Customers
            </h2>

            <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
              <p className="text-gray-300">
                Total Customers:{' '}
                <span className="font-bold text-blue-400">{Users.length}</span>
              </p>
            </div>

            {Users.length === 0 ? (
              <p className="text-gray-400 text-center">
                You haven’t added any customers yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {Users.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <UserIcon className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Admin View */}
        {viewMode === 'admin' && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              Subadmins & Their Customers
            </h2>

            <div className="bg-gray-800 p-4 rounded-lg mb-6 text-center">
              <p className="text-gray-300">
                Total Subadmins:{' '}
                <span className="font-bold text-blue-400">{Subadmins.length}</span>
              </p>
              <p className="text-gray-300">
                Total Customers:{' '}
                <span className="font-bold text-emerald-400">
                  {Subadmins.reduce((t, s) => t + (s.customers_count || 0), 0)}
                </span>
              </p>
            </div>

            {Subadmins.length === 0 ? (
              <p className="text-gray-400 text-center">No subadmins found.</p>
            ) : (
              <ul className="space-y-4">
                {Subadmins.map((sub) => (
                  <li
                    key={sub.id}
                    className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <UsersIcon className="text-blue-600 w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold">{sub.name}</p>
                          <p className="text-sm text-gray-400">{sub.email}</p>
                          <p className="text-sm text-gray-500">{sub.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-300">
                          Customers Added:{' '}
                          <span className="font-bold text-emerald-400">
                            {sub.customers_count || 0}
                          </span>
                        </p>
                      </div>
                    </div>

                    {sub.customers?.length > 0 && (
                      <ul className="mt-3 ml-8 space-y-2 border-l border-gray-700 pl-4">
                        {sub.customers.map((c) => (
                          <li key={c.id} className="text-sm text-gray-400">
                            → {c.name} ({c.email})
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* No Access View */}
        {viewMode === 'none' && (
          <div className="text-center text-gray-400 mt-10">
            You don’t have permission to view this data.
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
