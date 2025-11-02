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
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;

class UserController extends Controller
{

    public function AddUser(Request $request)
    {
        return Inertia::render('AddUser');
    }

    public function AddUserStore(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['required', 'string', 'max:20'],
        ]);        
        // $userid=auth()->user()->id;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make(Str::random(12)),
            'role' => 'customer',
            'created_by' => session('userid') ?? Auth::id(),
        ]);

        return redirect()->route('adduser')->with('success', 'User added successfully.');
    }


public function UserList(Request $request)
{
    $role = session('role');
    $userid = Auth::id();

    if ($role === 'admin') {
        $subadmins = User::where('role', 'subadmin')
            ->withCount('customers')
            ->with('customers')
            ->get();

        return inertia('List', [
            'Subadmins' => $subadmins,
            'viewMode' => 'admin',
        ]);
    }

    if ($role === 'subadmin') {
        $users = User::where('role', 'customer')
            ->where('created_by', $userid)
            ->withCount('customers')
            ->with('customers')
            ->get();

        return inertia('List', [
            'Users' => $users,
            'viewMode' => 'subadmin',
        ]);
    }

    return inertia('List', [
        'Users' => [],
        'viewMode' => 'none',
    ]);
}


}
