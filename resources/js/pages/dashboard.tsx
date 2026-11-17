import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, Clock, Stethoscope, CheckCircle, Building2 } from "lucide-react";

interface Stats {
    totalPatients: number;
    todayVisits: number;
    waiting: number;
    inProgress: number;
    completed: number;
}

interface PolyclinicVisit {
    name: string;
    total: number;
}

interface Props {
    stats: Stats;
    visitsByPolyclinic: PolyclinicVisit[];
}

export default function Dashboard({ stats, visitsByPolyclinic }: Props) {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 md:p-6">
                <h1 className="text-2xl font-semibold">Dashboard</h1>

                {/* Statistik Utama */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pasien</CardTitle>
                            <Users className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalPatients}</div>
                            <p className="text-xs text-muted-foreground">Pasien terdaftar</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kunjungan Hari Ini</CardTitle>
                            <CalendarDays className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.todayVisits}</div>
                            <p className="text-xs text-muted-foreground">Total pendaftaran hari ini</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
                            <Clock className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.waiting}</div>
                            <p className="text-xs text-muted-foreground">Status MENUNGGU</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sedang Diperiksa</CardTitle>
                            <Stethoscope className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.inProgress}</div>
                            <p className="text-xs text-muted-foreground">Status DIPERIKSA</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Telah Diperiksa</CardTitle>
                            <CheckCircle className="size-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completed}</div>
                            <p className="text-xs text-muted-foreground">Status SELESAI</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Kunjungan berdasarkan Poliklinik */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="size-5" />
                            Kunjungan Hari Ini per Poliklinik
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {visitsByPolyclinic.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Belum ada kunjungan hari ini.</p>
                        ) : (
                            <div className="space-y-3">
                                {visitsByPolyclinic.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between rounded-lg border px-4 py-3"
                                    >
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-lg font-semibold">{item.total}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: "Dashboard",
            href: dashboard(),
        },
    ],
};