<?php

namespace App\Http\Controllers;

use App\Models\UserLog;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserLogController extends Controller
{
    public function index()
    {
        $logs = UserLog::with('user')->orderByDesc('created_at')->get();

        return Inertia::render('UserLogs/Index', [
            'logs' => $logs
        ]);
    }

    public function create()
    {
        return Inertia::render('UserLogs/Create', [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'action' => 'required|string',
            'ip_address' => 'required|string|max:45',
            'created_at' => 'required|date',
        ]);

        UserLog::create($validated);

        return redirect()->route('userlogs.index')->with('success', 'Log enregistré.');
    }

    public function destroy(\App\Models\UserLog $userlog)
    {
        $userlog->delete();

        return back(303);
    }
}
