import React from 'react';
import { useForm } from '@inertiajs/react';
import { User, Mail, Lock, LogIn ,CheckCircle, Eye,EyeClosed } from 'lucide-react';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const Login = () => {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({      
    // role:'',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('user.login.store'), {
      onSuccess: () => {
        reset();
      },
      onError: (errors) => {
        console.log(errors);
      }
    });
    console.log(errors)
  };

  const StatusNotification = () => (
    <div
      className={`p-4 rounded-lg border flex items-start space-x-3 transition-all duration-300 ${
        recentlySuccessful
          ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
          : 'bg-red-600/20 border-red-500 text-red-400'
      }`}
    >
      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <p className="font-medium text-sm">
        {recentlySuccessful ? 'Account created successfully!' : 'Please fix the highlighted errors.'}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-6 font-sans">
      <div className="w-full bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-white text-center my-2">Login</h1>
        <p className="text-center text-gray-400 mb-8">
          Sign up to get started with your app.
        </p>

        {/* ✅ Success notification */}
        {recentlySuccessful && (
          <div className="mb-6">
            <StatusNotification />
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col p-5 mt-8 space-y-6">
            <TextInput name="email" value={data.email} onChange={(e)=>setData('email',e.target.value)} type="email"  placeholder="Your Email Address" />
             <InputError name="email" message={errors.email} />

          {/* <InputError name="password" message={errors.password} /> */}
            <TextInput
              name="password"
              value={data.password}
              onChange={(e)=>setData('password',e.target.value)}
              type={showPassword ? 'text' : 'password'}
             
              placeholder="Password (min 8 characters)"
            />
          <InputError name="password" message={errors.password} />


          <TextInput
            name="password_confirmation"
            value={data.password_confirmation}
            onChange={(e)=>setData('password_confirmation',e.target.value)}   
            type="password"

            placeholder="Confirm Password"
          />
          <InputError name="password_confirmation" message={errors.password_confirmation} />
          <button
            type="submit" 
            disabled={processing}
            className={`w-full flex justify-center items-center py-3 mt-6 rounded-lg text-lg font-semibold transition duration-300 ${
              processing
                ? 'bg-blue-700 cursor-not-allowed opacity-70'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
            }`}
          >
            {processing ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
            {processing ? 'Processing...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <a href={route('user.register.get')} className="text-blue-500 hover:text-blue-400 font-medium ml-1">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
