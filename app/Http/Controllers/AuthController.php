<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserLog;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:user,vendeur',
        ]);

        $user = \App\Models\User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Auth::login($user);

        UserLog::create([
            'user_id' => $user->id,
            'name' => Auth::user()->name,
            'action' => 'Inscription réussie',
            'ip_address' => $request->ip(),
            'created_at' => now(),
        ]);

        return redirect()->intended('/');
    }

    public function showLogin()
    {
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            UserLog::create([
                'user_id' => Auth::id(),
                'name' => Auth::user()->name,
                'action' => 'Connexion réussie',
                'ip_address' => $request->ip(),
            ]);

            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'Les informations ne correspondent pas.',
        ]);
    }

    public function logout(Request $request)
    {
        if (Auth::check()) {
            UserLog::create([
                'user_id' => Auth::id(),
                'name' => Auth::user()->name,
                'action' => 'Déconnexion',
                'ip_address' => $request->ip(),
            ]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
