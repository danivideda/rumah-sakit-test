import { Head } from "@inertiajs/react";
import { dashboard } from "@/routes";

export default function RawatJalan() {
    return (
        <>
            <Head title="Rawat Jalan" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 p-4">
                <div className="flex h-64 w-full max-w-md items-center justify-center rounded-xl border border-dashed">
                    <p className="text-center text-muted-foreground">
                        Halaman Rawat Jalan
                        <br />
                        <span className="text-sm">
                            Placeholder - Segera hadir
                        </span>
                    </p>
                </div>
            </div>
        </>
    );
}

RawatJalan.layout = {
    breadcrumbs: [
        { title: "Dashboard", href: dashboard() },
        { title: "Rawat Jalan", href: "/dashboard/rawat-jalan" },
    ],
};
