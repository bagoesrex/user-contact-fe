import { CreateAddressDialog } from "./create-address-dialog";

interface AddressWrapperProps {
    contactId: number
}

export default function AddressWrapper({ contactId }: AddressWrapperProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CreateAddressDialog contactId={contactId} />
        </div>
    )
}