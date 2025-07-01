<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'created_at' => 'nullable|date',
            'updated_at' => 'nullable|date',
        ]);

        $validated['password'] = bcrypt($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'Utilisateur créé.');
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function updateInfo(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'     => 'nullable|string|max:100',
            'email'    => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'avatar'   => 'nullable|image|max:2048', // 2MB max
        ]);

        // Avatar : upload si fichier présent
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        } else {
            unset($validated['avatar']);
        }

        // Nettoyage : on retire les champs vides
        foreach (['name', 'email', 'password'] as $field) {
            if (empty($validated[$field])) {
                unset($validated[$field]);
            }
        }

        // Hash du mot de passe si présent
        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }

        $user->update($validated);

        return back()->with('success', 'Informations mises à jour.');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Utilisateur supprimé.');
    }
}
