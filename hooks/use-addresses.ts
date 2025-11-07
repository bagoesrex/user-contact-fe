import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Address, AddressInput } from "@/types/address";

export const useAddresses = (contactId: number) => {
    return useQuery<Address[]>({
        queryKey: ["contacts", contactId, "addresses"],
        enabled: !!contactId,
        queryFn: async () => {
            const res = await fetch(`/api/contacts/${contactId}/addresses`);
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Gagal memuat alamat");
                throw new Error(data.message);
            }

            return data.addresses as Address[];
        },
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export function useCreateAddress(contactId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (values: AddressInput) => {
            const res = await fetch(`/api/contacts/${contactId}/addresses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Gagal membuat address");
            }

            return data as { address: Address };
        },
        onSuccess: () => {
            toast.success("Berhasil membuat address!");
            queryClient.invalidateQueries({
                queryKey: ["contacts", contactId, "addresses"],
            });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Terjadi kesalahan pada server.");
        },
    });
}

export function useUpdateAddress(contactId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, values }: { id: number; values: AddressInput }) => {
            const res = await fetch(`/api/contacts/${contactId}/addresses/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Gagal memperbarui address");
            }

            return data as { address: Address };
        },
        onSuccess: () => {
            toast.success("Berhasil memperbarui address!");
            queryClient.invalidateQueries({
                queryKey: ["contacts", contactId, "addresses"],
            });
        },
        onError: (err: Error) => {
            toast.error(err.message || "Terjadi kesalahan pada server.");
        },
    });
}