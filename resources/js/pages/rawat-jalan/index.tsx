import { Head, router, useForm } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import InputError from "@/components/input-error";
import { useMemo, useState } from "react";

interface Patient {
    id: number;
    name: string;
    medical_record_number: string;
}

interface Polyclinic {
    id: number;
    name: string;
}

interface Doctor {
    id: number;
    name: string;
    polyclinic_id: number;
}

interface Registration {
    id: number;
    registration_number: string;
    registration_date: string;
    status: string;
    complaint: string | null;
    payment_type: string;
    patient: { name: string; medical_record_number: string };
    doctor: { name: string };
    polyclinic: { name: string };
}

interface Props {
    registrations: {
        data: Registration[];
        links: any[];
    };
    patients: Patient[];
    polyclinics: Polyclinic[];
    doctors: Doctor[];
}

const statusMap: Record<string, string> = {
    waiting: "MENUNGGU",
    in_progress: "DIPERIKSA",
    completed: "SELESAI",
    cancelled: "BATAL",
};

export default function Index({
    registrations,
    patients,
    polyclinics,
    doctors,
}: Props) {
    const [selectedPolyclinic, setSelectedPolyclinic] = useState<string>("");

    const filteredDoctors = useMemo(() => {
        if (!selectedPolyclinic) return [];
        return doctors.filter(
            (d) => d.polyclinic_id === Number(selectedPolyclinic)
        );
    }, [selectedPolyclinic, doctors]);

    const { data, setData, post, processing, errors, reset } = useForm({
        registration_number: "",
        patient_id: "",
        polyclinic_id: "",
        doctor_id: "",
        registration_date: new Date().toISOString().split("T")[0],
        payment_type: "UMUM",
        complaint: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/dashboard/rawat-jalan", {
            onSuccess: () => {
                reset();
                setSelectedPolyclinic("");
            },
        });
    };

    return (
        <>
            <Head title="Pendaftaran Rawat Jalan" />

            <div className="space-y-6 p-4 md:p-6">
                <h1 className="text-2xl font-semibold">
                    Pendaftaran Rawat Jalan
                </h1>

                {/* Form Pendaftaran */}
                <Card>
                    <CardHeader>
                        <CardTitle>Form Pendaftaran Baru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="grid gap-4 md:grid-cols-2"
                        >
                            <div className="space-y-2">
                                <Label>Nomor Pendaftaran *</Label>
                                <Input
                                    value={data.registration_number}
                                    onChange={(e) =>
                                        setData(
                                            "registration_number",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Contoh: RJ-20261117-001"
                                    required
                                />
                                <InputError
                                    message={errors.registration_number}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Tanggal Kunjungan *</Label>
                                <Input
                                    type="date"
                                    value={data.registration_date}
                                    onChange={(e) =>
                                        setData(
                                            "registration_date",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.registration_date}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Pasien *</Label>
                                <Select
                                    value={data.patient_id}
                                    onValueChange={(v) =>
                                        setData("patient_id", v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih pasien" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {patients.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={String(p.id)}
                                            >
                                                {p.medical_record_number} -{" "}
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.patient_id} />
                            </div>

                            <div className="space-y-2">
                                <Label>Poliklinik *</Label>
                                <Select
                                    value={data.polyclinic_id}
                                    onValueChange={(v) => {
                                        setData("polyclinic_id", v);
                                        setData("doctor_id", "");
                                        setSelectedPolyclinic(v);
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih poliklinik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {polyclinics.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={String(p.id)}
                                            >
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.polyclinic_id} />
                            </div>

                            <div className="space-y-2">
                                <Label>Dokter *</Label>
                                <Select
                                    value={data.doctor_id}
                                    onValueChange={(v) =>
                                        setData("doctor_id", v)
                                    }
                                    disabled={!selectedPolyclinic}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih dokter" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filteredDoctors.map((d) => (
                                            <SelectItem
                                                key={d.id}
                                                value={String(d.id)}
                                            >
                                                {d.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.doctor_id} />
                            </div>

                            <div className="space-y-2">
                                <Label>Jenis Pembayaran *</Label>
                                <Select
                                    value={data.payment_type}
                                    onValueChange={(v) =>
                                        setData("payment_type", v)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UMUM">
                                            UMUM
                                        </SelectItem>
                                        <SelectItem value="BPJS">
                                            BPJS
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.payment_type} />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label>Keluhan Utama</Label>
                                <Input
                                    value={data.complaint}
                                    onChange={(e) =>
                                        setData("complaint", e.target.value)
                                    }
                                    placeholder="Keluhan pasien..."
                                />
                                <InputError message={errors.complaint} />
                            </div>

                            <div className="md:col-span-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? "Menyimpan..." : "Daftarkan"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Daftar Pendaftaran */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pendaftaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="p-2 text-left">
                                            No. Pendaftaran
                                        </th>
                                        <th className="p-2 text-left">
                                            Tanggal
                                        </th>
                                        <th className="p-2 text-left">
                                            Pasien
                                        </th>
                                        <th className="p-2 text-left">
                                            Poliklinik
                                        </th>
                                        <th className="p-2 text-left">
                                            Dokter
                                        </th>
                                        <th className="p-2 text-left">
                                            Pembayaran
                                        </th>
                                        <th className="p-2 text-left">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrations.data.map((r) => (
                                        <tr key={r.id} className="border-b">
                                            <td className="p-2">
                                                {r.registration_number}
                                            </td>
                                            <td className="p-2">
                                                {new Date(
                                                    r.registration_date
                                                ).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="p-2">
                                                {
                                                    r.patient
                                                        .medical_record_number
                                                }{" "}
                                                - {r.patient.name}
                                            </td>
                                            <td className="p-2">
                                                {r.polyclinic.name}
                                            </td>
                                            <td className="p-2">
                                                {r.doctor.name}
                                            </td>
                                            <td className="p-2">
                                                {r.payment_type}
                                            </td>
                                            <td className="p-2 font-medium">
                                                {statusMap[r.status] ||
                                                    r.status}
                                            </td>
                                        </tr>
                                    ))}
                                    {registrations.data.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="p-4 text-center text-muted-foreground"
                                            >
                                                Belum ada pendaftaran
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: "Dashboard", href: dashboard() },
        { title: "Rawat Jalan", href: "/dashboard/rawat-jalan" },
    ],
};
