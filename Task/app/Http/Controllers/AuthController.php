<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class AuthController extends Controller
{
    
    public function dashboard()
    {
        return inertia('Dashboard');
    }

    public function register()
    {
        return inertia::render('Registration');
    }
    
    public function registerStore(Request $request)
    {
         $validated = $request->validate([
            'role' => 'required|string|in:subadmin',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:255|unique:users',
             'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()],

        ]);


        $user = User::create([
            'role' => $validated['role'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
        ]);

        Auth::login($user);
        if($user->role==='subadmin'){
            return redirect()->route('dashboard');            
        }

        return redirect()->route('dashboard');
    }
    
    public function login()
    {
        return inertia::render('Login');
    }

    public function loginStore(Request $request){
         $request->validate([
            // 'role' => 'required|string|in:admin,subadmin,customer',
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()],
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            

        session([
            'id' => $user->id,
            'role' => $user->role,
            'name' => $user->name,
            'email' => $user->email,
        ]);
            
            if ($user->role === 'admin') {
                return redirect()->route('dashboard');
            } elseif ($user->role === 'subadmin') {
                return redirect()->route('dashboard');
            } 
        }

        return back()->withErrors(['email' => 'Invalid email','password' => 'Invalid password']);
            // return redirect()->route('dashboard');
    }

    public function logout(Request $request)
    {
        
        session()->forget('id');
        session()->forget('role');
        session()->forget('name');
        session()->forget('email');
        return redirect()->route('user.login.get');
    }
}

