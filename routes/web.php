<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PatientController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Patient routes (protected)
    Route::resource('patients', PatientController::class)
        ->except(['create', 'show', 'edit']);

    Route::post('patients/{id}/restore', [PatientController::class, 'restore'])
        ->name('patients.restore');
});

require __DIR__.'/settings.php';
