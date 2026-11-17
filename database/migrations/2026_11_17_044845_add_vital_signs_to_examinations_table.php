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
        Schema::table('examinations', function (Blueprint $table) {
            $table->text('keluhan')->nullable()->after('registration_id');
            $table->unsignedSmallInteger('systolic_bp')->nullable()->after('keluhan');
            $table->unsignedSmallInteger('diastolic_bp')->nullable()->after('systolic_bp');
            $table->unsignedSmallInteger('pulse')->nullable()->after('diastolic_bp');
            $table->decimal('temperature', 4, 1)->nullable()->after('pulse');
            $table->unsignedSmallInteger('respiratory_rate')->nullable()->after('temperature');
            $table->decimal('weight', 5, 2)->nullable()->after('respiratory_rate');
            $table->decimal('height', 5, 2)->nullable()->after('weight');
            $table->string('examiner_name')->nullable()->after('examined_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('examinations', function (Blueprint $table) {
            $table->dropColumn([
                'keluhan',
                'systolic_bp',
                'diastolic_bp',
                'pulse',
                'temperature',
                'respiratory_rate',
                'weight',
                'height',
                'examiner_name',
            ]);
        });
    }
};
