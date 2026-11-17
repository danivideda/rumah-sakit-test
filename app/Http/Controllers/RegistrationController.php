<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationRequest;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Polyclinic;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->string('sort')->toString() ?: 'registration_date';
        $direction = $request->string('direction')->toString() === 'asc' ? 'asc' : 'desc';

        $allowedSorts = ['registration_date', 'created_at'];
        if (! in_array($sort, $allowedSorts, true)) {
            $sort = 'registration_date';
        }

        $registrations = Registration::with(['patient', 'doctor', 'polyclinic'])
            ->orderBy($sort, $direction)
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('rawat-jalan/index', [
            'registrations' => $registrations,
            'patients' => Patient::orderBy('name')->get(['id', 'name', 'medical_record_number']),
            'polyclinics' => Polyclinic::where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'doctors' => Doctor::where('is_active', true)
                ->with('polyclinic:id,name')
                ->orderBy('name')
                ->get(['id', 'name', 'polyclinic_id']),
            'filters' => [
                'sort' => $sort,
                'direction' => $direction,
            ],
        ]);
    }

    public function store(RegistrationRequest $request)
    {
        Registration::create([
            ...$request->validated(),
            'status' => 'waiting',
        ]);

        return back()->with('success', 'Pendaftaran rawat jalan berhasil dibuat.');
    }
}
