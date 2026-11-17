# Rumah Sakit Test

Aplikasi test Sistem Informasi Rumah Sakit (SIMRS) berbasis Laravel + Inertia React.

## Struktur Database

Berikut adalah tabel utama yang digunakan dalam sistem:

### `polyclinics`
Poliklinik yang tersedia di rumah sakit.

| Kolom | Tipe | Keterangan |
|-------|------|----------|
| `id` | bigint | Primary key |
| `code` | string | Kode unik poliklinik (contoh: `UMUM`, `ANAK`) |
| `name` | string | Nama poliklinik |
| `description` | text | Deskripsi (opsional) |
| `is_active` | boolean | Status aktif |

### `doctors`
Dokter yang bertugas di poliklinik.

| Kolom | Tipe | Keterangan |
|-------|------|----------|
| `id` | bigint | Primary key |
| `polyclinic_id` | bigint | Foreign key → `polyclinics.id` |
| `name` | string | Nama dokter |
| `specialty` | string | Spesialisasi (opsional) |
| `sip_number` | string | Nomor SIP (unik, opsional) |
| `phone` | string | Nomor telepon (opsional) |
| `is_active` | boolean | Status aktif |

### `patients`
Data pasien.

| Kolom | Tipe | Keterangan |
|-------|------|----------|
| `id` | bigint | Primary key |
| `medical_record_number` | string | **Nomor Rekam Medis** (unik) |
| `nik` | string(16) | **NIK** (unik) |
| `name` | string | Nama pasien |
| `gender` | enum | `L` / `P` |
| `birth_date` | date | Tanggal lahir |
| `birth_place` | string | Tempat lahir (opsional) |
| `address` | text | Alamat (opsional) |
| `phone` | string | Nomor telepon (opsional) |
| `blood_type` | string | Golongan darah (opsional) |

### `registrations`
Pendaftaran pasien ke poliklinik & dokter.

| Kolom | Tipe | Keterangan |
|-------|------|----------|
| `id` | bigint | Primary key |
| `registration_number` | string | Nomor pendaftaran (unik) |
| `patient_id` | bigint | Foreign key → `patients.id` |
| `doctor_id` | bigint | Foreign key → `doctors.id` |
| `polyclinic_id` | bigint | Foreign key → `polyclinics.id` |
| `registration_date` | datetime | Waktu pendaftaran |
| `queue_number` | smallint | Nomor antrian (opsional) |
| `status` | enum | `waiting`, `in_progress`, `completed`, `cancelled` |
| `complaint` | text | Keluhan (opsional) |

### `examinations`
Hasil pemeriksaan yang terhubung ke pendaftaran.

| Kolom | Tipe | Keterangan |
|-------|------|----------|
| `id` | bigint | Primary key |
| `registration_id` | bigint | Foreign key → `registrations.id` (unik) |
| `diagnosis` | text | Diagnosis (opsional) |
| `notes` | text | Catatan pemeriksaan (opsional) |
| `prescription` | text | Resep (opsional) |
| `examined_at` | datetime | Waktu pemeriksaan (opsional) |

## Relasi

```
polyclinics 1—* doctors
patients 1—* registrations
doctors 1—* registrations
polyclinics 1—* registrations
registrations 1—1 examinations
```

- Setiap pasien memiliki **nomor rekam medis unik** dan **NIK unik**.
- Setiap dokter terhubung ke satu poliklinik.
- Setiap pendaftaran terhubung ke pasien, dokter, dan poliklinik.
- Setiap pemeriksaan terhubung ke satu pendaftaran.
