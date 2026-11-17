<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('medical_record_number')->unique(); // Nomor Rekam Medis
            $table->string('nik', 16)->unique();               // NIK
            $table->string('name');
            $table->enum('gender', ['L', 'P']);                // Laki-laki / Perempuan
            $table->date('birth_date');
            $table->string('birth_place')->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('blood_type', 5)->nullable();       // A, B, AB, O, A+, dll
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
