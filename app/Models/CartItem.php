<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'user_id',
        'article_id',
    ];

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime',
    ];

    // Un item du panier appartient à un utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un item du panier est lié à un article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
