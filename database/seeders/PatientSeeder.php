<?php

namespace Database\Seeders;

use App\Models\Patient;
use Illuminate\Database\Seeder;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patients = [
            [
                'nik' => '3201010101010001',
                'name' => 'Ahmad Fauzi',
                'gender' => 'L',
                'birth_date' => '1990-05-12',
                'birth_place' => 'Jakarta',
                'address' => 'Jl. Merdeka No. 10, Yogyakarta',
                'phone' => '081234560001',
                'blood_type' => 'A',
            ],
            [
                'nik' => '3201010202020002',
                'name' => 'Siti Nurhaliza',
                'gender' => 'P',
                'birth_date' => '1992-08-23',
                'birth_place' => 'Bandung',
                'address' => 'Jl. Sudirman No. 45, Sleman',
                'phone' => '081234560002',
                'blood_type' => 'B',
            ],
            [
                'nik' => '3201010303030003',
                'name' => 'Budi Santoso',
                'gender' => 'L',
                'birth_date' => '1985-11-05',
                'birth_place' => 'Surabaya',
                'address' => 'Jl. Malioboro No. 88, Yogyakarta',
                'phone' => '081234560003',
                'blood_type' => 'O',
            ],
            [
                'nik' => '3201010404040004',
                'name' => 'Dewi Lestari',
                'gender' => 'P',
                'birth_date' => '1995-03-17',
                'birth_place' => 'Semarang',
                'address' => 'Jl. Godean No. 12, Bantul',
                'phone' => '081234560004',
                'blood_type' => 'AB',
            ],
            [
                'nik' => '3201010505050005',
                'name' => 'Rizky Pratama',
                'gender' => 'L',
                'birth_date' => '2000-12-01',
                'birth_place' => 'Yogyakarta',
                'address' => 'Jl. Kaliurang Km 5, Sleman',
                'phone' => '081234560005',
                'blood_type' => 'A',
            ],
            [
                'nik' => '3201010606060006',
                'name' => 'Maya Indah',
                'gender' => 'P',
                'birth_date' => '1988-07-29',
                'birth_place' => 'Malang',
                'address' => 'Jl. Solo No. 33, Yogyakarta',
                'phone' => '081234560006',
                'blood_type' => 'B',
            ],
            [
                'nik' => '3201010707070007',
                'name' => 'Hendra Gunawan',
                'gender' => 'L',
                'birth_date' => '1979-01-15',
                'birth_place' => 'Medan',
                'address' => 'Jl. Parangtritis No. 21, Bantul',
                'phone' => '081234560007',
                'blood_type' => 'O',
            ],
            [
                'nik' => '3201010808080008',
                'name' => 'Putri Ayu',
                'gender' => 'P',
                'birth_date' => '2003-09-08',
                'birth_place' => 'Denpasar',
                'address' => 'Jl. Magelang No. 7, Yogyakarta',
                'phone' => '081234560008',
                'blood_type' => 'AB',
            ],
            [
                'nik' => '3201010909090009',
                'name' => 'Agus Salim',
                'gender' => 'L',
                'birth_date' => '1998-04-22',
                'birth_place' => 'Palembang',
                'address' => 'Jl. Wonosari No. 55, Gunungkidul',
                'phone' => '081234560009',
                'blood_type' => 'A',
            ],
            [
                'nik' => '3201011010100010',
                'name' => 'Lina Marlina',
                'gender' => 'P',
                'birth_date' => '1991-06-30',
                'birth_place' => 'Makassar',
                'address' => 'Jl. Affandi No. 19, Sleman',
                'phone' => '081234560010',
                'blood_type' => 'O',
            ],
        ];

        $year = now()->year;
        $counter = 1;

        foreach ($patients as $patient) {
            $medicalRecordNumber = sprintf('RM-%d-%04d', $year, $counter);

            Patient::updateOrCreate(
                ['nik' => $patient['nik']],
                array_merge($patient, [
                    'medical_record_number' => $medicalRecordNumber,
                ])
            );

            $counter++;
        }
    }
}