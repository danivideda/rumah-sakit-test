<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Examination extends Model
{
    protected $fillable = [
        'registration_id',
        'keluhan',
        'systolic_bp',
        'diastolic_bp',
        'pulse',
        'temperature',
        'respiratory_rate',
        'weight',
        'height',
        'examined_at',
        'examiner_name',
        'diagnosis',
        'notes',
        'prescription',
    ];

    protected $casts = [
        'examined_at' => 'datetime',
        'temperature' => 'decimal:1',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }
}