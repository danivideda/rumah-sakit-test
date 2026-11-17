<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Polyclinic;
use App\Models\Registration;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        $patients = Patient::all();
        $polyclinics = Polyclinic::all();
        $doctors = Doctor::all();

        if ($patients->isEmpty() || $polyclinics->isEmpty() || $doctors->isEmpty()) {
            $this->command->warn('Data pasien, poliklinik, atau dokter masih kosong. Jalankan seeder master dulu.');
            return;
        }

        $statuses = ['waiting', 'in_progress', 'completed', 'cancelled'];
        $paymentTypes = ['UMUM', 'BPJS'];

        $counter = 1;

        // Buat 15 data pendaftaran contoh
        for ($i = 0; $i < 15; $i++) {
            $patient = $patients->random();
            $polyclinic = $polyclinics->random();

            // Ambil dokter yang sesuai dengan poliklinik
            $doctor = $doctors->where('polyclinic_id', $polyclinic->id)->random();

            if (!$doctor) {
                continue;
            }

            $date = Carbon::today()->subDays(rand(0, 14));

            $registrationNumber = sprintf(
                'RJ-%s-%04d',
                $date->format('Ymd'),
                $counter
            );

            Registration::updateOrCreate(
                ['registration_number' => $registrationNumber],
                [
                    'patient_id' => $patient->id,
                    'doctor_id' => $doctor->id,
                    'polyclinic_id' => $polyclinic->id,
                    'registration_date' => $date->setTime(rand(8, 15), rand(0, 59)),
                    'status' => $statuses[array_rand($statuses)],
                    'payment_type' => $paymentTypes[array_rand($paymentTypes)],
                    'complaint' => $this->randomComplaint(),
                    'queue_number' => rand(1, 50),
                ]
            );

            $counter++;
        }
    }

    private function randomComplaint(): string
    {
        $complaints = [
            'Demam dan batuk sejak 2 hari',
            'Sakit kepala dan pusing',
            'Nyeri perut bagian bawah',
            'Batuk berdahak',
            'Sesak napas ringan',
            'Nyeri sendi',
            'Kontrol rutin',
            'Mual dan muntah',
            'Sakit gigi',
            'Mata merah dan gatal',
            'Nyeri dada',
            'Luka di kaki',
        ];

        return $complaints[array_rand($complaints)];
    }
}