import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Search } from "lucide-react";
import { dashboard } from "@/routes";

interface Patient {
    id: number;
    name: string;
    medical_record_number: string;
    nik: string;
}

interface Doctor {
    name: string;
}

interface Polyclinic {
    name: string;
}

interface Registration {
    id: number;
    registration_number: string;
    registration_date: string;
    status: string;
    complaint: string | null;
    patient: Patient;
    doctor: Doctor;
    polyclinic: Polyclinic;
}

interface Props {
    registrations: {
        data: Registration[];
        links: any[];
        meta: any;
    };
    filters: {
        search: string;
    };
}

interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export default function PeriksaPasien({ registrations, filters }: Props) {
    const { auth } = usePage().props as { auth: { user: AuthUser } };
    const [selected, setSelected] = useState<Registration | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            registration_id: "",
            keluhan: "",
            systolic_bp: "",
            diastolic_bp: "",
            pulse: "",
            temperature: "",
            respiratory_rate: "",
            weight: "",
            height: "",
            examined_at: new Date().toISOString().slice(0, 16),
            examiner_name: auth?.user?.name || "",
        });

    const selectRegistration = (reg: Registration) => {
        setSelected(reg);
        setData({
            registration_id: String(reg.id),
            keluhan: reg.complaint || "",
            systolic_bp: "",
            diastolic_bp: "",
            pulse: "",
            temperature: "",
            respiratory_rate: "",
            weight: "",
            height: "",
            examined_at: new Date().toISOString().slice(0, 16),
            examiner_name: auth?.user?.name || "",
        });
        clearErrors();
    };

    const cancel = () => {
        setSelected(null);
        reset();
        clearErrors();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/periksa-pasien", {
            onSuccess: () => {
                reset();
                setSelected(null);
            },
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            "/dashboard/periksa-pasien",
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <>
            <Head title="Periksa Pasien" />

            <div className="space-y-6 p-4 md:p-6">
                <h1 className="text-2xl font-semibold">
                    Pencatatan Tanda-Tanda Vital
                </h1>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari No RM, NIK, atau Nama pasien..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="pl-9"
                    />
                </div>

                {/* Form Pemeriksaan */}
                {selected && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Pemeriksaan:{" "}
                                {selected.patient.medical_record_number} -{" "}
                                {selected.patient.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="grid gap-4 md:grid-cols-2"
                            >
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="keluhan">Keluhan</Label>
                                    <Input
                                        id="keluhan"
                                        value={data.keluhan}
                                        onChange={(e) =>
                                            setData("keluhan", e.target.value)
                                        }
                                        placeholder="Keluhan pasien..."
                                    />
                                    <InputError message={errors.keluhan} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="systolic_bp">
                                        Tekanan Darah Sistolik (mmHg)
                                    </Label>
                                    <Input
                                        id="systolic_bp"
                                        type="number"
                                        value={data.systolic_bp}
                                        onChange={(e) =>
                                            setData(
                                                "systolic_bp",
                                                e.target.value
                                            )
                                        }
                                        placeholder="120"
                                    />
                                    <InputError message={errors.systolic_bp} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="diastolic_bp">
                                        Tekanan Darah Diastolik (mmHg)
                                    </Label>
                                    <Input
                                        id="diastolic_bp"
                                        type="number"
                                        value={data.diastolic_bp}
                                        onChange={(e) =>
                                            setData(
                                                "diastolic_bp",
                                                e.target.value
                                            )
                                        }
                                        placeholder="80"
                                    />
                                    <InputError message={errors.diastolic_bp} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="pulse">
                                        Denyut Nadi (bpm)
                                    </Label>
                                    <Input
                                        id="pulse"
                                        type="number"
                                        value={data.pulse}
                                        onChange={(e) =>
                                            setData("pulse", e.target.value)
                                        }
                                        placeholder="72"
                                    />
                                    <InputError message={errors.pulse} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="temperature">
                                        Suhu Tubuh (°C)
                                    </Label>
                                    <Input
                                        id="temperature"
                                        type="number"
                                        step="0.1"
                                        value={data.temperature}
                                        onChange={(e) =>
                                            setData(
                                                "temperature",
                                                e.target.value
                                            )
                                        }
                                        placeholder="36.5"
                                    />
                                    <InputError message={errors.temperature} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="respiratory_rate">
                                        Frekuensi Pernapasan (x/menit)
                                    </Label>
                                    <Input
                                        id="respiratory_rate"
                                        type="number"
                                        value={data.respiratory_rate}
                                        onChange={(e) =>
                                            setData(
                                                "respiratory_rate",
                                                e.target.value
                                            )
                                        }
                                        placeholder="18"
                                    />
                                    <InputError
                                        message={errors.respiratory_rate}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="weight">
                                        Berat Badan (kg)
                                    </Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        step="0.1"
                                        value={data.weight}
                                        onChange={(e) =>
                                            setData("weight", e.target.value)
                                        }
                                        placeholder="65.5"
                                    />
                                    <InputError message={errors.weight} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="height">
                                        Tinggi Badan (cm)
                                    </Label>
                                    <Input
                                        id="height"
                                        type="number"
                                        step="0.1"
                                        value={data.height}
                                        onChange={(e) =>
                                            setData("height", e.target.value)
                                        }
                                        placeholder="170"
                                    />
                                    <InputError message={errors.height} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="examined_at">
                                        Waktu Pemeriksaan
                                    </Label>
                                    <Input
                                        id="examined_at"
                                        type="datetime-local"
                                        value={data.examined_at}
                                        onChange={(e) =>
                                            setData(
                                                "examined_at",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError message={errors.examined_at} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="examiner_name">
                                        Nama Petugas Pemeriksa
                                    </Label>
                                    <Input
                                        id="examiner_name"
                                        value={data.examiner_name}
                                        onChange={(e) =>
                                            setData(
                                                "examiner_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.examiner_name}
                                    />
                                </div>

                                <div className="md:col-span-2 flex gap-2 pt-2">
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Tanda Vital"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancel}
                                    >
                                        Batal
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {/* Daftar Antrian Pemeriksaan */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Daftar Pasien Menunggu Pemeriksaan
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-2">No. Pendaftaran</th>
                                    <th className="p-2">Tanggal</th>
                                    <th className="p-2">Pasien</th>
                                    <th className="p-2">Poliklinik</th>
                                    <th className="p-2">Dokter</th>
                                    <th className="p-2">Keluhan</th>
                                    <th className="p-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="p-4 text-center text-muted-foreground"
                                        >
                                            Tidak ada pasien yang menunggu
                                            pemeriksaan
                                        </td>
                                    </tr>
                                ) : (
                                    registrations.data.map((reg) => (
                                        <tr
                                            key={reg.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="p-2 font-mono">
                                                {reg.registration_number}
                                            </td>
                                            <td className="p-2">
                                                {new Date(
                                                    reg.registration_date
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="p-2">
                                                {
                                                    reg.patient
                                                        .medical_record_number
                                                }{" "}
                                                - {reg.patient.name}
                                            </td>
                                            <td className="p-2">
                                                {reg.polyclinic.name}
                                            </td>
                                            <td className="p-2">
                                                {reg.doctor.name}
                                            </td>
                                            <td className="p-2 max-w-xs truncate">
                                                {reg.complaint || "-"}
                                            </td>
                                            <td className="p-2 text-right">
                                                <Button
                                                    size="sm"
                                                    onClick={() =>
                                                        selectRegistration(reg)
                                                    }
                                                    disabled={!!selected}
                                                >
                                                    Periksa
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

PeriksaPasien.layout = {
    breadcrumbs: [
        { title: "Dashboard", href: dashboard() },
        { title: "Periksa Pasien", href: "/dashboard/periksa-pasien" },
    ],
};
