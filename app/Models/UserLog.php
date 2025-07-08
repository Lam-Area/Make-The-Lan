<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    protected $table = 'user_logs';

    protected $fillable = [
        'user_id',
        'name',
        'action',
        'ip_address',
    ];

    public $timestamps = true;

    protected $casts = [
        'created_at' => 'datetime',
    ];

    // logs du user
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
