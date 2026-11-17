<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExaminationRequest;
use App\Models\Examination;
use App\Models\Registration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->trim();

        $registrations = Registration::with(['patient', 'doctor', 'polyclinic'])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('medical_record_number', 'like', "%{$search}%")
                        ->orWhere('nik', 'like', "%{$search}%");
                });
            })
            ->whereDoesntHave('examination')
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('periksa-pasien', [
            'registrations' => $registrations,
            'filters' => ['search' => $search],
        ]);
    }

    public function store(ExaminationRequest $request)
    {
        $data = $request->validated();

        if (empty($data['examined_at'])) {
            $data['examined_at'] = now();
        }

        if (empty($data['examiner_name'])) {
            $data['examiner_name'] = auth()->user()?->name;
        }

        Examination::create($data);

        Registration::where('id', $data['registration_id'])->update([
            'status' => 'in_progress',
        ]);

        return back()->with('success', 'Tanda-tanda vital berhasil dicatat.');
    }
}
