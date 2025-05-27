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

    public $timestamps = false;

    protected $casts = [
        'price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Article appartient à un vendeur (User)
    public function vendeur()
    {
        return $this->belongsTo(User::class, 'vendeur_id');
    }

    // Article peut être dans plusieurs favoris
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // Article peut être dans plusieurs paniers
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    // Article peut être commandé plusieurs fois
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
