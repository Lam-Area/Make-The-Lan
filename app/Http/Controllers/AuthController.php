<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\UserLog;
use App\Models\Favorite;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // ⬅️ ne plus valider/recevoir "role"
        $validated = $request->validate([
            'name'                  => 'required|string|max:100',
            'email'                 => 'required|email:rfc|max:150|unique:users,email',
            'password'              => 'required|string|min:8|confirmed',
        ]);

        // ⬅️ rôle forcé côté serveur
        $user = \App\Models\User::create([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'password'   => bcrypt($validated['password']),
            'role'       => 'user',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Auth::login($user);

        UserLog::create([
            'user_id'    => $user->id,
            'name'       => Auth::user()->name, // si votre table user_logs n'a pas "name", retirez cette ligne
            'action'     => 'Inscription réussie',
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
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            UserLog::create([
                'user_id'    => Auth::id(),
                'name'       => Auth::user()->name, // idem remarque
                'action'     => 'Connexion réussie',
                'ip_address' => $request->ip(),
            ]);

            // Fusion liste de souhaits locale -> BDD
            $wishlist = json_decode($request->cookie('wishlist_items'), true);
            if (is_array($wishlist)) {
                foreach ($wishlist as $item) {
                    if (!empty($item['id'])) {
                        Favorite::firstOrCreate(
                            ['user_id' => Auth::id(), 'article_id' => $item['id']],
                            ['created_at' => now()]
                        );
                    }
                }
            }

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
                'user_id'    => Auth::id(),
                'name'       => Auth::user()->name, // idem remarque
                'action'     => 'Déconnexion',
                'ip_address' => $request->ip(),
            ]);
        }

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
