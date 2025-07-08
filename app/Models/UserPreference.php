<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = [
        'user_id',
        'dark_mode',
    ];


    public $timestamps = false;

    protected $casts = [
        'dark_mode' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // pref du user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
