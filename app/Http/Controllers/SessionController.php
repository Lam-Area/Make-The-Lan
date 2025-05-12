<?php

namespace App\Http\Controllers;

use App\Models\Session;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function index()
    {
        $sessions = Session::with('user')->get();

        return Inertia::render('Sessions/Index', [
            'sessions' => $sessions
        ]);
    }

    public function create()
    {
        return Inertia::render('Sessions/Create', [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'ip_address' => 'required|string|max:45',
            'user_agent' => 'required|string',
            'last_activity' => 'required|date',
        ]);

        Session::create($validated);

        return redirect()->route('sessions.index')->with('success', 'Session enregistrée.');
    }

    public function destroy(Session $session)
    {
        $session->delete();

        return redirect()->route('sessions.index')->with('success', 'Session supprimée.');
    }
}
