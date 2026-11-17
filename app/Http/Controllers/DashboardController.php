<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Registration;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        // Total pasien terdaftar (aktif, tidak soft deleted)
        $totalPatients = Patient::count();

        // Total kunjungan hari ini
        $todayVisits = Registration::whereDate('registration_date', $today)->count();

        // Jumlah berdasarkan status (hari ini)
        $waiting = Registration::whereDate('registration_date', $today)
            ->where('status', 'waiting')
            ->count();

        $inProgress = Registration::whereDate('registration_date', $today)
            ->where('status', 'in_progress')
            ->count();

        $completed = Registration::whereDate('registration_date', $today)
            ->where('status', 'completed')
            ->count();

        // Jumlah kunjungan berdasarkan poliklinik (hari ini)
        $visitsByPolyclinic = Registration::query()
            ->select('polyclinics.name', DB::raw('count(*) as total'))
            ->join('polyclinics', 'registrations.polyclinic_id', '=', 'polyclinics.id')
            ->whereDate('registrations.registration_date', $today)
            ->groupBy('polyclinics.name')
            ->orderByDesc('total')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalPatients' => $totalPatients,
                'todayVisits' => $todayVisits,
                'waiting' => $waiting,
                'inProgress' => $inProgress,
                'completed' => $completed,
            ],
            'visitsByPolyclinic' => $visitsByPolyclinic,
        ]);
    }
}