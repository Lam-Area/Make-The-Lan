<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title',
        'description',
        'price',
        'file_path',
        'code_preview',
        'vendeur_id',
        'slug',
    ];

    public $timestamps = true;

    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // article appartenant à id_vendeur
    public function vendeur()
    {
        return $this->belongsTo(User::class, 'vendeur_id');
    }

    // Article dans favoris
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Article dans paniers
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    // Article commander
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
