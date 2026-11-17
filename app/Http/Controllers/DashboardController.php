<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'patientCount' => Patient::count(),
        ]);
    }
}