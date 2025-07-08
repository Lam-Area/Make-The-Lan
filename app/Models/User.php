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
        'avatar',
    ];

    public $timestamps = true;

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function articles()
    {
        return $this->hasMany(Article::class, 'vendeur_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function logs()
    {
        return $this->hasMany(UserLog::class);
    }

    public function preferences()
    {
        return $this->hasOne(UserPreference::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
