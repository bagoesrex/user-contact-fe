import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookUser, CircleUserRound, Mail, Phone } from "lucide-react"
import DeleteContactDialog from "./delete-contact-dialog"
import { Contact } from "@/types/contact"
import UpdateContactDialog from "./update-contact-dialog"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ListContactProps {
    contact: Contact
    onSuccess: () => void
}

export default function ListContactCard({ contact, onSuccess }: ListContactProps) {
    const details = [
        { icon: Mail, value: contact.email },
        { icon: Phone, value: contact.phone },
    ]

    return (
        <Card className="h-47 justify-center border-2 border-primary bg-gray-100/50 gap-2">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-1 flex justify-center items-center">
                        <CircleUserRound color="white" size={25} />
                    </div>
                    <h2 className="text-xl font-bold">
                        {`${contact.first_name} ${contact.last_name}`}
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center pl-8 pr-5 gap-3 font-sans text-sm">
                {details.map(({ icon: Icon, value }, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <Icon className="text-primary" size={22} />
                        <span className="truncate overflow-hidden whitespace-nowrap max-w-[180px]">{value}</span>
                    </div>
                ))}
                <div className="flex gap-2 justify-end">
                    <Button className="cursor-pointer self-start" asChild>
                        <Link href={`/dashboard/contacts/${contact.id}`}>
                            <BookUser size={12} />
                            <p className="text-sm">Detail</p>
                        </Link >
                    </Button>
                    <UpdateContactDialog contact={contact} />
                    <DeleteContactDialog contactId={contact.id} onSuccess={onSuccess} />
                </div>
            </CardContent>
        </Card >
    )
}