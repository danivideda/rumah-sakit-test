<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatientRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->trim();

        $patients = Patient::query()
            ->withTrashed()
            ->when($search, function ($query) use ($search) {
                $query->where('medical_record_number', 'like', "%{$search}%")
                    ->orWhere('nik', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('patients/index', [
            'patients' => $patients,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(PatientRequest $request)
    {
        Patient::create($request->validated());

        return back()->with('success', 'Pasien berhasil ditambahkan.');
    }

    public function update(PatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());

        return back()->with('success', 'Data pasien berhasil diperbarui.');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete(); // soft delete

        return back()->with('success', 'Pasien berhasil dinonaktifkan.');
    }

    public function restore(int $id)
    {
        $patient = Patient::withTrashed()->findOrFail($id);
        $patient->restore();

        return back()->with('success', 'Pasien berhasil diaktifkan kembali.');
    }
}
