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
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registration_id')->constrained()->cascadeOnDelete();
            $table->text('diagnosis')->nullable();
            $table->text('notes')->nullable();
            $table->text('prescription')->nullable();
            $table->dateTime('examined_at')->nullable();
            $table->timestamps();

            // Satu pemeriksaan per pendaftaran (bisa diubah kalau mau 1-to-many)
            $table->unique('registration_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};
