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

    // item du panier < à l'utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // item du panier lié à l'article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
