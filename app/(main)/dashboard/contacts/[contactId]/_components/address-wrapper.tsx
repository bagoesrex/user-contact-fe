import { Address } from "@/types/address";
import { CreateAddressDialog } from "./create-address-dialog";
import ListAddressCard from "./list-address-card";

interface AddressWrapperProps {
    addresses: Address[]
    contactId: number
    onSuccess: () => void
}

export default function AddressWrapper({ addresses, contactId, onSuccess }: AddressWrapperProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CreateAddressDialog contactId={contactId} onSuccess={onSuccess} />
            {
                addresses.map((address) => (
                    <ListAddressCard
                        key={address.id}
                        address={address}
                        contactId={contactId}
                        onSuccess={onSuccess}
                    />
                ))
            }
        </div>
    )
}