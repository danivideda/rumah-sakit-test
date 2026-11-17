<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\ExaminationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('dashboard')->group(function () {
        Route::resource('patients', PatientController::class)
            ->except(['create', 'show', 'edit']);

        Route::post('patients/{id}/restore', [PatientController::class, 'restore'])
            ->name('patients.restore');

        Route::resource('rawat-jalan', RegistrationController::class)
            ->only(['index', 'store'])
            ->parameters(['rawat-jalan' => 'registration']);

        Route::get('periksa-pasien', [ExaminationController::class, 'index'])->name('periksa-pasien');
        Route::post('periksa-pasien', [ExaminationController::class, 'store'])->name('periksa-pasien.store');
    });
});

require __DIR__.'/settings.php';
