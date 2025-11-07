import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Address } from "@/types/address";

export const useAddresses = (contactId?: number) => {
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
