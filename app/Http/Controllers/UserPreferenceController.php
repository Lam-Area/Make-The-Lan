<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\UserPreference;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPreferenceController extends Controller
{
    public function index()
    {
        $preferences = UserPreference::with('user')->get();

        return Inertia::render('UserPreferences/Index', [
            'preferences' => $preferences
        ]);
    }

    public function create()
    {
        return Inertia::render('UserPreferences/Create', [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'dark_mode' => 'required|boolean',
            'language' => 'required|string|max:10',
            'notification_email' => 'required|boolean',
        ]);

        UserPreference::create($validated);

        return redirect()->route('userpreferences.index')->with('success', 'Préférences enregistrées.');
    }

    public function edit(UserPreference $userPreference)
    {
        return Inertia::render('UserPreferences/Edit', [
            'preference' => $userPreference,
            'users' => User::all()
        ]);
    }

    public function update(Request $request, UserPreference $userPreference)
    {
        $validated = $request->validate([
            'dark_mode' => 'required|boolean',
            'language' => 'required|string|max:10',
            'notification_email' => 'required|boolean',
        ]);

        $userPreference->update($validated);

        return redirect()->route('userpreferences.index')->with('success', 'Préférences mises à jour.');
    }

    public function destroy(UserPreference $userPreference)
    {
        $userPreference->delete();

        return redirect()->route('userpreferences.index')->with('success', 'Préférences supprimées.');
    }

    public function toggle(Request $request)
    {
        $user = Auth::user();

        $preference = UserPreference::where('user_id', $user->id)->first();

        if ($preference) {
            $preference->dark_mode = $request->input('dark_mode');
            $preference->save();
        } else {
            // On crée avec les champs requis
            UserPreference::create([
                'user_id' => $user->id,
                'dark_mode' => $request->input('dark_mode'),
                'language' => 'fr', // valeur par défaut
                'notification_email' => true, // valeur par défaut
            ]);
        }

        return back();
    }


}
