import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Pencil, Trash2, RotateCcw, Search } from "lucide-react";

interface Patient {
    id: number;
    medical_record_number: string;
    nik: string;
    name: string;
    gender: "L" | "P";
    birth_date: string;
    birth_place: string | null;
    address: string | null;
    phone: string | null;
    blood_type: string | null;
    deleted_at: string | null;
}

interface Props {
    patients: {
        data: Patient[];
        links: any[];
        meta: any;
    };
    filters: {
        search: string;
    };
}

export default function Index({ patients, filters }: Props) {
    const [editing, setEditing] = useState<Patient | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } =
        useForm({
            medical_record_number: "",
            nik: "",
            name: "",
            gender: "L" as "L" | "P",
            birth_date: "",
            birth_place: "",
            address: "",
            phone: "",
            blood_type: "",
        });

    const startEdit = (patient: Patient) => {
        setEditing(patient);
        setData({
            medical_record_number: patient.medical_record_number,
            nik: patient.nik,
            name: patient.name,
            gender: patient.gender,
            birth_date: patient.birth_date,
            birth_place: patient.birth_place || "",
            address: patient.address || "",
            phone: patient.phone || "",
            blood_type: patient.blood_type || "",
        });
        clearErrors();
    };

    const cancelEdit = () => {
        setEditing(null);
        reset();
        clearErrors();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editing) {
            put(`/dashboard/patients/${editing.id}`, {
                onSuccess: () => {
                    reset();
                    setEditing(null);
                },
            });
        } else {
            post("/dashboard/patients", {
                onSuccess: () => reset(),
            });
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        router.get(
            "/dashboard/patients",
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const destroy = (id: number) => {
        if (confirm("Nonaktifkan pasien ini?")) {
            router.delete(`/dashboard/patients/${id}`);
        }
    };

    const restore = (id: number) => {
        router.post(`/dashboard/patients/${id}/restore`);
    };

    return (
        <>
            <Head title="Pengelolaan Pasien" />

            <div className="space-y-6 p-4 md:p-6">
                <h1 className="text-2xl font-semibold">
                    Pengelolaan Data Pasien
                </h1>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {editing ? "Edit Pasien" : "Tambah Pasien Baru"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={submit}
                            className="grid gap-4 md:grid-cols-2"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="medical_record_number">
                                    Nomor Rekam Medis *
                                </Label>
                                <Input
                                    id="medical_record_number"
                                    value={data.medical_record_number}
                                    onChange={(e) =>
                                        setData(
                                            "medical_record_number",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.medical_record_number}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nik">NIK *</Label>
                                <Input
                                    id="nik"
                                    value={data.nik}
                                    onChange={(e) =>
                                        setData("nik", e.target.value)
                                    }
                                    maxLength={16}
                                    required
                                />
                                <InputError message={errors.nik} />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Jenis Kelamin *</Label>
                                <select
                                    id="gender"
                                    value={data.gender}
                                    onChange={(e) =>
                                        setData(
                                            "gender",
                                            e.target.value as "L" | "P"
                                        )
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                    required
                                >
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                                <InputError message={errors.gender} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_date">
                                    Tanggal Lahir *
                                </Label>
                                <Input
                                    id="birth_date"
                                    type="date"
                                    value={data.birth_date}
                                    onChange={(e) =>
                                        setData("birth_date", e.target.value)
                                    }
                                    max={new Date().toISOString().split("T")[0]}
                                    required
                                />
                                <InputError message={errors.birth_date} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="birth_place">
                                    Tempat Lahir
                                </Label>
                                <Input
                                    id="birth_place"
                                    value={data.birth_place}
                                    onChange={(e) =>
                                        setData("birth_place", e.target.value)
                                    }
                                />
                                <InputError message={errors.birth_place} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Input
                                    id="address"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="blood_type">
                                    Golongan Darah
                                </Label>
                                <Input
                                    id="blood_type"
                                    value={data.blood_type}
                                    onChange={(e) =>
                                        setData("blood_type", e.target.value)
                                    }
                                    placeholder="A, B, AB, O, A+, dll"
                                />
                                <InputError message={errors.blood_type} />
                            </div>

                            <div className="md:col-span-2 flex gap-2 pt-2">
                                <Button type="submit" disabled={processing}>
                                    {editing
                                        ? "Update Pasien"
                                        : "Tambah Pasien"}
                                </Button>
                                {editing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancelEdit}
                                    >
                                        Batal
                                    </Button>
                                )}
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Cari No RM, NIK, atau Nama..."
                        defaultValue={filters.search}
                        onChange={handleSearch}
                        className="pl-9"
                    />
                </div>

                {/* Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Pasien</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-2">No RM</th>
                                    <th className="p-2">NIK</th>
                                    <th className="p-2">Nama</th>
                                    <th className="p-2">Jenis Kelamin</th>
                                    <th className="p-2">Tgl Lahir</th>
                                    <th className="p-2">Telepon</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-4 text-center text-muted-foreground"
                                        >
                                            Tidak ada data pasien
                                        </td>
                                    </tr>
                                ) : (
                                    patients.data.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="border-b hover:bg-muted/50"
                                        >
                                            <td className="p-2 font-mono">
                                                {patient.medical_record_number}
                                            </td>
                                            <td className="p-2 font-mono">
                                                {patient.nik}
                                            </td>
                                            <td className="p-2">
                                                {patient.name}
                                            </td>
                                            <td className="p-2">
                                                {patient.gender === "L"
                                                    ? "Laki-laki"
                                                    : "Perempuan"}
                                            </td>
                                            <td className="p-2">
                                                {patient.birth_date
                                                    ? new Date(
                                                          patient.birth_date
                                                      ).toLocaleDateString(
                                                          "id-ID",
                                                          {
                                                              day: "numeric",
                                                              month: "long",
                                                              year: "numeric",
                                                          }
                                                      )
                                                    : "-"}
                                            </td>
                                            <td className="p-2">
                                                {patient.phone || "-"}
                                            </td>
                                            <td className="p-2">
                                                {patient.deleted_at ? (
                                                    <span className="text-destructive">
                                                        Nonaktif
                                                    </span>
                                                ) : (
                                                    <span className="text-green-600">
                                                        Aktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-2 text-right space-x-1">
                                                {!patient.deleted_at && (
                                                    <>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                startEdit(
                                                                    patient
                                                                )
                                                            }
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() =>
                                                                destroy(
                                                                    patient.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="size-4 text-destructive" />
                                                        </Button>
                                                    </>
                                                )}
                                                {patient.deleted_at && (
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() =>
                                                            restore(patient.id)
                                                        }
                                                    >
                                                        <RotateCcw className="size-4 text-green-600" />
                                                    </Button>
                                                )}
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
