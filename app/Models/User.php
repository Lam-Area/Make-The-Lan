<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // 1,n avec Articles
    public function articles()
    {
        return $this->hasMany(Article::class, 'vendeur_id');
    }

    // 1,n avec Orders
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // 1,n avec Messages (envoyés)
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    // 1,n avec Messages (reçus)
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    // 1,n avec UserLogs
    public function logs()
    {
        return $this->hasMany(UserLog::class);
    }

    // 1,1 avec UserPreferences
    public function preferences()
    {
        return $this->hasOne(UserPreference::class);
    }

    // 1,n avec Favorites
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // 1,n avec CartItems
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
