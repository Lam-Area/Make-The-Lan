<?php

// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'total_price'];
    public $timestamps = false;

    protected $casts = [
        'total_price' => 'decimal:2',
        'created_at'  => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation existante
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // ✅ Alias pour la compatibilité avec "items"
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
