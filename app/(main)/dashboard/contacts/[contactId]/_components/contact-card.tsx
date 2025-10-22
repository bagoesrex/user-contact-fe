import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contact } from "@/types/contact";
import { Mail, Phone, User, UserCog } from "lucide-react";

interface ContactCardProps {
    contact: Contact
}

export default function ContactCard({ contact }: ContactCardProps) {
    return (
        <Card className="border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-col items-center gap-2">
                    <div className="bg-primary rounded-full size-fit p-2.5 flex justify-center items-center">
                        <User color="white" size={40} />
                    </div>
                    <h2 className="text-2xl font-bold">{`${contact.first_name} ${contact.last_name}`}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                        <div className="flex flex-row gap-2 items-center">
                            <UserCog size={24} />
                            <span>First Name</span>
                        </div>
                        <p className="pl-8 font-medium text-xl">{contact.first_name}</p>
                    </div>
                    <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                        <div className="flex flex-row gap-2 items-center">
                            <UserCog size={24} />
                            <span>Last Name</span>
                        </div>
                        <p className="pl-8 font-medium text-xl">{contact.last_name}</p>
                    </div>
                </div>
                <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail size={24} />
                        <span>Email</span>
                    </div>
                    <p className="pl-8 font-medium text-xl">{contact.email}</p>
                </div>
                <div className="border-2 border-primary bg-gray-100/30 rounded p-3">
                    <div className="flex flex-row gap-2 items-center">
                        <Phone size={24} />
                        <span>Phone</span>
                    </div>
                    <p className="pl-8 font-medium text-xl">{contact.phone}</p>
                </div>
            </CardContent>
        </Card>
    )
}