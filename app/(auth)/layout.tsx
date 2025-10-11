import { Separator } from "@/components/ui/separator";
import { APP_CONFIG } from "@/config/app-config";
import { ContactRound } from "lucide-react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="grid h-dvh justify-center p-2 lg:grid-cols-2">
                <div className="bg-primary relative order-1 hidden h-full rounded-3xl lg:flex">
                    <div className="text-primary-foreground absolute top-10 space-y-1 px-10">
                        <ContactRound className="size-10" />
                        <h1 className="text-2xl font-medium">{APP_CONFIG.name}</h1>
                        <p className="text-sm">Kelola dan pantau data kontak pengguna dengan mudah dan efisien.</p>
                    </div>

                    <div className="absolute bottom-10 flex w-full justify-between px-10">
                        <div className="text-primary-foreground flex-1 space-y-1">
                            <h2 className="font-medium">Akses Cepat</h2>
                            <p className="text-sm">
                                Tambahkan, ubah, atau hapus data pengguna langsung dari dashboard.
                            </p>
                        </div>
                        <Separator orientation="vertical" className="mx-3 !h-auto" />
                        <div className="text-primary-foreground flex-1 space-y-1">
                            <h2 className="font-medium">Keamanan Data</h2>
                            <p className="text-sm">
                                Semua informasi pengguna dilindungi dengan enkripsi dan autentikasi.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative order-2 flex h-full">{children}</div>
            </div>
        </main>
    );
}
