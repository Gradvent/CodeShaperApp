<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Pasta extends Model
{
    use HasFactory;

    protected $fillable = [
        // 'id',
        'created_at',
        // 'updated_at',
        'user_id',
        'title',
        'textcode',
        'lang',
        'closed_at',
        'access',
    ];

    protected $hidden = [
        // 'id',
        // 'created_at',
        'updated_at',
        // 'user_id',
        // 'title',
        // 'textcode',
        // 'lang',
        'closed_at',
        // 'access',
    ];

    public static function lastPublic10() {
        return static::where('access', 'public')->orderByDesc('created_at')->limit(10)->get();
    }

    protected $appends = ['short'];

    public function getShortAttribute()
    {
        return substr(md5($this->id), 0, 10);
    }
}
