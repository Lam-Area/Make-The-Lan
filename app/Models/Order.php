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

    // commande appartenant à l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // commande qui contient x articles "OrderItems"
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
