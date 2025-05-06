<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
        'read_at',
    ];

    public $timestamps = false;

    protected $casts = [
        'read_at' => 'datetime',
        'created_at' => 'datetime',
    ];

    // Message envoyé par un utilisateur
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    // Message reçu par un utilisateur
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
