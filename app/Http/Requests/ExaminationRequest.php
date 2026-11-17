<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExaminationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registration_id' => ['required', 'exists:registrations,id', 'unique:examinations,registration_id'],
            'keluhan' => ['nullable', 'string'],
            'systolic_bp' => ['nullable', 'integer', 'min:50', 'max:300'],
            'diastolic_bp' => ['nullable', 'integer', 'min:30', 'max:200'],
            'pulse' => ['nullable', 'integer', 'min:30', 'max:220'],
            'temperature' => ['nullable', 'numeric', 'between:30,45'],
            'respiratory_rate' => ['nullable', 'integer', 'min:5', 'max:60'],
            'weight' => ['nullable', 'numeric', 'between:0.5,300'],
            'height' => ['nullable', 'numeric', 'between:30,250'],
            'examined_at' => ['nullable', 'date'],
            'examiner_name' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'registration_id.unique' => 'Pendaftaran ini sudah memiliki data pemeriksaan.',
        ];
    }
}