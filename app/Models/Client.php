<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'ruc',
        'name',
        'tradename',
        'message',
        'web_url',
        'sector',
        'description',
        'contact_name',
        'contact_phone',
        'contact_email',
        'contact_address',
        'source',
        'origin',
        'date',
        'time',
        'ip',
        'client_width',
        'client_height',
        'client_system',
        'status_id',
        'created_by',
        'updated_by',
        'status'
    ];
}
