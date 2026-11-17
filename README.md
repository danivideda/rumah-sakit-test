# Rumah Sakit Test

Aplikasi test Sistem Informasi Rumah Sakit (SIMRS) berbasis Laravel + Inertia React.

## Requirements

- PHP 8.3+
- Composer
- Node.js 18+
- Docker & Docker Compose

## Cara Menjalankan (Local Development)

### 1. Clone Repository

```bash
git clone https://github.com/danivideda/rumah-sakit-test.git
cd rumah-sakit-test
```

### 2. Install Dependencies

```bash
composer install
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env
php artisan key:generate
```

Ubah konfigurasi database di `.env` menjadi PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=rumah-sakit-test
DB_USERNAME=admin
DB_PASSWORD=adminpassword
```

### 4. Jalankan Database (Docker)

```bash
docker compose up -d
```

PostgreSQL akan berjalan di port `5432`.

Untuk berhenti:

```bash
docker compose down
```

### 5. Migrate & Seed

```bash
php artisan migrate --seed
```

### 6. Jalankan Aplikasi

Buka **2 terminal**:

**Terminal 1 — Laravel**

```bash
php artisan serve
```

**Terminal 2 — Vite (Frontend)**

```bash
npm run dev
```

Akses aplikasi di: [http://localhost:8000](http://localhost:8000)

### 7. Login

Buat user pertama melalui halaman register, atau lewat tinker:

```bash
php artisan tinker
```

```php
User::factory()->create([
    'name' => 'Admin',
    'email' => 'admin@example.com',
    'password' => bcrypt('password'),
]);
```

## Perintah Berguna

| Perintah | Keterangan |
|----------|------------|
| `docker compose up -d` | Jalankan database |
| `docker compose down` | Stop database |
| `php artisan migrate:fresh --seed` | Reset database + seed ulang |
| `php artisan route:list` | Lihat daftar route |
| `php artisan optimize:clear` | Clear semua cache |
| `npm run build` | Build production frontend |

## Struktur Halaman

| URL | Keterangan |
|-----|------------|
| `/dashboard` | Statistik kunjungan |
| `/dashboard/patients` | Manajemen pasien |
| `/dashboard/rawat-jalan` | Pendaftaran rawat jalan |


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
