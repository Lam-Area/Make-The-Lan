<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $fillable = [
        'user_id',
        'ip_address',
        'user_agent',
        'last_activity',
    ];

    public $timestamps = false;

    protected $casts = [
        'last_activity' => 'datetime',
    ];

    // Une session appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
