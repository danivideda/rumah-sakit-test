<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Polyclinic extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'is_active',
    ];

    public function doctors(): HasMany
    {
        return $this->hasMany(Doctor::class);
    }
}