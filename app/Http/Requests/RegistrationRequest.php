<?php

namespace App\Http\Requests;

use App\Models\Doctor;
use App\Models\Registration;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'registration_number' => [
                'required',
                'string',
                'max:50',
                Rule::unique('registrations', 'registration_number'),
            ],
            'patient_id' => ['required', 'exists:patients,id'],
            'polyclinic_id' => ['required', 'exists:polyclinics,id'],
            'doctor_id' => [
                'required',
                'exists:doctors,id',
                function ($attribute, $value, $fail) {
                    $doctor = Doctor::find($value);
                    if ($doctor && $doctor->polyclinic_id != $this->polyclinic_id) {
                        $fail('Dokter yang dipilih tidak sesuai dengan poliklinik.');
                    }
                },
            ],
            'registration_date' => ['required', 'date'],
            'payment_type' => ['required', Rule::in(['UMUM', 'BPJS'])],
            'complaint' => ['nullable', 'string', 'max:1000'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $exists = Registration::query()
                ->where('patient_id', $this->patient_id)
                ->where('doctor_id', $this->doctor_id)
                ->whereDate('registration_date', $this->registration_date)
                ->whereIn('status', ['waiting', 'in_progress'])
                ->exists();

            if ($exists) {
                $validator->errors()->add(
                    'patient_id',
                    'Pasien sudah memiliki pendaftaran aktif pada dokter dan tanggal yang sama.'
                );
            }
        });
    }
}
