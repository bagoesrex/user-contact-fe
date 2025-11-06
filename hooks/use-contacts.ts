import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Contact, ContactInput } from "@/types/contact";

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

export function useCreateContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: ContactInput) => {
            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal membuat kontak");

            return data as { contact: Contact };
        },
        onSuccess: () => {
            toast.success("Berhasil membuat contact!");
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Terjadi kesalahan pada server.");
        },
    });
}

export function useUpdateContact() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, values }: { id: number; values: ContactInput }) => {
            const res = await fetch(`/api/contacts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Gagal memperbarui kontak");

            return data as { contact: Contact };
        },
        onSuccess: () => {
            toast.success("Berhasil memperbarui contact!");
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Terjadi kesalahan pada server.");
        },
    });
}