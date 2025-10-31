import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import SubadminDashboard from './SubAdminDashboard';
import AdminDashboard from './AdminDashboard';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;

    if (!user?.role || (user.role !== 'admin' && user.role !== 'subadmin')) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
                <Head title="Dashboard" />
                <h1 className="text-3xl font-bold mb-4">Welcome</h1>
                <p className="text-gray-400 text-lg mb-6">
                    You don’t have a dashboard assigned yet.
                </p>
                <a
                    href={route('user.logout.destroy')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg transition"
                >
                    Exit
                </a>
            </div>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user.role === 'admin' ? 'Admin Dashboard' : 'Subadmin Dashboard'}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-8 px-6 bg-gray-900 min-h-screen text-white">
                {user.role === 'admin' ? (
                    <AdminDashboard user={user} auth={auth} />
                ) : (
                    <SubadminDashboard user={user} auth={auth} />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
