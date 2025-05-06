<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total_price',
    ];

    public $timestamps = false;

    protected $casts = [
        'total_price' => 'decimal:2',
        'created_at' => 'datetime',
    ];

    // Une commande appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Une commande contient plusieurs articles (OrderItems)
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
