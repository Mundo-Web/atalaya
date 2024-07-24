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
        'id',
        'description',
        'contact_name',
        'contact_phone',
        'contact_email',
        'contact_address',
        'status',
        'created_at',
        'updated_at',
        'ruc',
        'name',
        'contact_position',
        'message',
        'web_url',
        'source',
        'date',
        'time',
        'ip',
        'origin',
        'client_width',
        'client_height',
        'client_latitude',
        'client_longitude',
        'client_system',
        'status_id',
        'created_by',
        'updated_by',
        'tradename',
        'assigned_to',
        'sector',
        'country_prefix',
        'workers',
    ];
}
