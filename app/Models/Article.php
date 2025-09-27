<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'price',
        'brand',
        'model',
        'category',
        'sku',
        'stock_quantity',
        'main_image_url',
        'specs',
        'vendeur_id',
    ];

    protected $casts = [
        'price'          => 'decimal:2',
        'specs'          => 'array',        // JSON -> array
        'stock_quantity' => 'integer',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
    ];

    /** --------------------
     * Relations
     * -------------------- */
    public function vendeur()
    {
        return $this->belongsTo(User::class, 'vendeur_id');
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    /** --------------------
     * Mutators / Accessors
     * -------------------- */

    // Normalise automatiquement l'URL de l'image principale
    public function setMainImageUrlAttribute($value)
    {
        if ($value) {
            $path = ltrim($value, '/');
            if (!str_starts_with($path, 'storage/')) {
                $path = 'storage/' . $path;
            }
            $this->attributes['main_image_url'] = $path;
        } else {
            $this->attributes['main_image_url'] = null;
        }
    }

    // Renvoie toujours un tableau pour specs (évite les null)
    public function getSpecsAttribute($value)
    {
        return $value ? json_decode($value, true) : [];
    }

    /** --------------------
     * Slug auto-généré
     * -------------------- */
    protected static function booted(): void
    {
        static::creating(function (Article $article) {
            if (empty($article->slug) && !empty($article->title)) {
                $article->slug = static::uniqueSlugFromTitle($article->title);
            }
        });

        static::updating(function (Article $article) {
            if ($article->isDirty('title')) {
                $article->slug = static::uniqueSlugFromTitle($article->title, $article->id);
            }
        });
    }

    public static function uniqueSlugFromTitle(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 2;

        while (
            static::query()
                ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
