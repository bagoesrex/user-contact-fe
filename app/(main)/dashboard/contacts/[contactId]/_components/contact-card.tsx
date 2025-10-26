import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact } from "@/types/contact";
import { Mail, MapPin, Phone, User, UserCog } from "lucide-react";
import AddressWrapper from "./address-wrapper";
import { Address } from "@/types/address";

interface ContactCardProps {
    contact: Contact
    addresses: Address[]
    onSuccess: () => void
}

export default function ContactCard({ contact, addresses, onSuccess }: ContactCardProps) {
    return (
        <Card className="border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2">
                    <div className="bg-primary rounded-full size-fit p-2.5 flex justify-center items-center">
                        <User color="white" size={40} />
                    </div>
                    <h2 className="text-xl font-bold">{`${contact.first_name} ${contact.last_name}`}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                        <div className="flex flex-row gap-2 items-center">
                            <UserCog size={24} />
                            <span>First Name</span>
                        </div>
                        <p className="pl-8 font-medium text-md">{contact.first_name}</p>
                    </div>
                    <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                        <div className="flex flex-row gap-2 items-center">
                            <UserCog size={24} />
                            <span>Last Name</span>
                        </div>
                        <p className="pl-8 font-medium text-md">{contact.last_name}</p>
                    </div>
                </div>
                <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail size={24} />
                        <span>Email</span>
                    </div>
                    <p className="pl-8 font-medium text-md">{contact.email}</p>
                </div>
                <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                    <div className="flex flex-row gap-2 items-center">
                        <Phone size={24} />
                        <span>Phone</span>
                    </div>
                    <p className="pl-8 font-medium text-md">{contact.phone}</p>
                </div>
                <div className="space-y-3 mt-2">
                    <div className="flex flex-row gap-2 items-center">
                        <MapPin />
                        <h3 className="text-md font-bold">Addresses</h3>
                    </div>
                    <AddressWrapper contactId={contact.id} addresses={addresses} onSuccess={onSuccess} />
                </div>
            </CardContent>
        </Card>
    )
}