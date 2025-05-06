<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = [
        'user_id',
        'dark_mode',
        'language',
        'notification_email',
    ];

    public $timestamps = false;

    protected $casts = [
        'dark_mode' => 'boolean',
        'notification_email' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Les préférences appartiennent à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
