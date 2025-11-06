import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Contact } from "@/types/contact";

export const useContacts = () => {
    return useQuery<Contact[]>({
        queryKey: ["contacts"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/contacts");
                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.message || "Gagal memuat daftar kontak");
                    return [];
                }

                return data.contacts || [];
            } catch (err) {
                console.error(err);
                toast.error("Terjadi kesalahan pada server.");
                return [];
            }
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};
