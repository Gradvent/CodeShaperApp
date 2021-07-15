<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPUnit\Framework\isNull;

class Pasta extends Model
{
    use HasFactory;
    
    // Константы для имен полей
    public const C_ID = 'id';
    public const C_CREATED_AT = 'created_at';
    public const C_UPDATED_AT = 'updated_at';
    public const C_USER_ID = 'user_id';
    public const C_TITLE = 'title';
    public const C_TEXT_CODE = 'textcode';
    public const C_LANG = 'lang';
    public const C_CLOSED_AT = 'closed_at';
    public const C_ACCESS = 'access';
    public const E_ACCESS_PUBLIC = 'public';
    public const E_ACCESS_UNLISTED = 'unlisted';
    public const E_ACCESS_PRIVATE = 'private';

    public const V_SHORT = 'short';

    protected $fillable = [
        // 'id',
        Pasta::C_CREATED_AT, // 'created_at',
        // 'updated_at',
        Pasta::C_USER_ID, // 'user_id',
        Pasta::C_TITLE, // 'title',
        Pasta::C_TEXT_CODE, // 'textcode',
        Pasta::C_LANG, // 'lang',
        Pasta::C_CLOSED_AT, // 'closed_at',
        Pasta::C_ACCESS, // 'access',
    ];

    protected $hidden = [
        // 'id',
        // 'created_at',
        Pasta::UPDATED_AT, // 'updated_at',
        // 'user_id',
        // 'title',
        // 'textcode',
        // 'lang',
        // Pasta::C_CLOSED_AT, //'closed_at',
        // 'access',
    ];

    /**
     * Выборка коллекции с элементами с неистекшим сроком жизни
     */
    public static function actives() {
        return static::all()->filter(function($pasta){
            return is_null($pasta->closed_at) or $pasta->closed_at > Carbon::now(); 
        });
    }
    
    /**
     * Выборка коллекции с элементами с истекшим сроком жизни
     */
    public static function closes() {
        return static::all()->filter(function($pasta){
            return $pasta->closed_at <= now()->timestamp; 
        });
    }

    public static function lastPublic10() {
        return static::actives()->where(static::C_ACCESS, static::E_ACCESS_PUBLIC)->sortByDesc(static::CREATED_AT)->slice(0, 10);
    }

    protected $appends = [Pasta::V_SHORT];

    public function getShortAttribute()
    {
        return substr(md5($this->id), 0, 10);
    }
}
