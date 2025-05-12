<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::with(['sender', 'receiver'])->get();

        return Inertia::render('Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function create()
    {
        return Inertia::render('Messages/Create', [
            'users' => User::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required|string',
            'created_at' => 'required|date',
            'read_at' => 'nullable|date',
        ]);

        Message::create($validated);

        return redirect()->route('messages.index')->with('success', 'Message envoyé.');
    }

    public function destroy(Message $message)
    {
        $message->delete();

        return redirect()->route('messages.index')->with('success', 'Message supprimé.');
    }
}
