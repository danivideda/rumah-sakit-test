<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Polyclinic;
use Illuminate\Database\Seeder;

class PolyclinicDoctorSeeder extends Seeder
{
    public function run(): void
    {
        // ======================
        // Data Poliklinik
        // ======================
        $polyclinics = [
            [
                'code' => 'UMUM',
                'name' => 'Poli Umum',
                'description' => 'Pelayanan kesehatan umum',
                'is_active' => true,
            ],
            [
                'code' => 'ANAK',
                'name' => 'Poli Anak',
                'description' => 'Pelayanan kesehatan anak',
                'is_active' => true,
            ],
            [
                'code' => 'GIGI',
                'name' => 'Poli Gigi',
                'description' => 'Pelayanan kesehatan gigi dan mulut',
                'is_active' => true,
            ],
            [
                'code' => 'JANTUNG',
                'name' => 'Poli Jantung',
                'description' => 'Pelayanan kesehatan jantung',
                'is_active' => true,
            ],
            [
                'code' => 'MATA',
                'name' => 'Poli Mata',
                'description' => 'Pelayanan kesehatan mata',
                'is_active' => true,
            ],
        ];

        foreach ($polyclinics as $poly) {
            Polyclinic::updateOrCreate(
                ['code' => $poly['code']],
                $poly
            );
        }

        // Ambil ulang data poliklinik yang sudah dibuat
        $poliUmum = Polyclinic::where('code', 'UMUM')->first();
        $poliAnak = Polyclinic::where('code', 'ANAK')->first();
        $poliGigi = Polyclinic::where('code', 'GIGI')->first();
        $poliJantung = Polyclinic::where('code', 'JANTUNG')->first();
        $poliMata = Polyclinic::where('code', 'MATA')->first();

        // ======================
        // Data Dokter
        // ======================
        $doctors = [
            // Poli Umum
            [
                'polyclinic_id' => $poliUmum->id,
                'name' => 'dr. Andi Wijaya',
                'specialty' => 'Umum',
                'sip_number' => 'SIP-UMUM-001',
                'phone' => '081234567890',
                'is_active' => true,
            ],
            [
                'polyclinic_id' => $poliUmum->id,
                'name' => 'dr. Siti Rahmawati',
                'specialty' => 'Umum',
                'sip_number' => 'SIP-UMUM-002',
                'phone' => '081234567891',
                'is_active' => true,
            ],

            // Poli Anak
            [
                'polyclinic_id' => $poliAnak->id,
                'name' => 'dr. Budi Santoso, Sp.A',
                'specialty' => 'Spesialis Anak',
                'sip_number' => 'SIP-ANAK-001',
                'phone' => '081234567892',
                'is_active' => true,
            ],
            [
                'polyclinic_id' => $poliAnak->id,
                'name' => 'dr. Maya Putri, Sp.A',
                'specialty' => 'Spesialis Anak',
                'sip_number' => 'SIP-ANAK-002',
                'phone' => '081234567893',
                'is_active' => true,
            ],

            // Poli Gigi
            [
                'polyclinic_id' => $poliGigi->id,
                'name' => 'drg. Rina Amelia',
                'specialty' => 'Dokter Gigi',
                'sip_number' => 'SIP-GIGI-001',
                'phone' => '081234567894',
                'is_active' => true,
            ],

            // Poli Jantung
            [
                'polyclinic_id' => $poliJantung->id,
                'name' => 'dr. Hendra Kusuma, Sp.JP',
                'specialty' => 'Spesialis Jantung',
                'sip_number' => 'SIP-JANTUNG-001',
                'phone' => '081234567895',
                'is_active' => true,
            ],

            // Poli Mata
            [
                'polyclinic_id' => $poliMata->id,
                'name' => 'dr. Lina Kartika, Sp.M',
                'specialty' => 'Spesialis Mata',
                'sip_number' => 'SIP-MATA-001',
                'phone' => '081234567896',
                'is_active' => true,
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::updateOrCreate(
                ['sip_number' => $doctor['sip_number']],
                $doctor
            );
        }
    }
}
