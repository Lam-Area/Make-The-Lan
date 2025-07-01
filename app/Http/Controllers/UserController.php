<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
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

        // ✅ Validation
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|image|max:2048',
        ]);

        // ✅ Mise à jour des champs simples
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = bcrypt($validated['password']);
        }

        // ✅ Avatar : suppression et upload si nouveau
        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        }

        $user->save();

        return back()->with('success', 'Informations mises à jour.');
    }


    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Utilisateur supprimé.');
    }
}
