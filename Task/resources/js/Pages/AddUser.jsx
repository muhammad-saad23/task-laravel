import { useForm } from '@inertiajs/react';
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';

export default function AddUser() {
  const { data, setData, processing, errors, post, reset } = useForm({
    role: 'customers',
    name: '',
    email: '',
    phone: '',
    password: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('adduser.store'), {
      onSuccess: () => reset(),
      onError: (errors) => console.log(errors)
    });
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-md mx-auto mt-10 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-black text-white"
            />
            {errors.name && <InputError message={errors.name} />}
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-black text-white"
            />
            {errors.email && <InputError message={errors.email} />}
          </div>
          <div>
            <label className="block font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              className="w-full border rounded px-3 py-2 bg-black text-white"
            />
            {errors.phone && <InputError message={errors.phone} />}
          </div>
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {processing ? 'Saving...' : 'Save Customer'}
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
