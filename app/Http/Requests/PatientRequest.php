<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $patientId = $this->route('patient')?->id;

        return [
            'medical_record_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('patients', 'medical_record_number')->ignore($patientId),
            ],
            'nik' => [
                'required',
                'string',
                'size:16',
                Rule::unique('patients', 'nik')->ignore($patientId),
            ],
            'name' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(['L', 'P'])],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'birth_place' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:20'],
            'blood_type' => ['nullable', 'string', 'max:5'],
        ];
    }
}