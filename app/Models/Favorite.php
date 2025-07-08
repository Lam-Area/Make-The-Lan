<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'article_id',
    ];

    public $timestamps = false;

    protected $casts = [
        'created_at' => 'datetime',
    ];

    // favori appartenant à utilisateur
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // favori --> vers un article
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
