<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'medical_record_number',
        'nik',
        'name',
        'gender',
        'birth_date',
        'birth_place',
        'address',
        'phone',
        'blood_type',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
}
