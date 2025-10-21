import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleUserRound, Mail, Phone, SquarePen, Trash } from "lucide-react"
import DeleteContactDialog from "./delete-contact-dialog"

interface ContactProps {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}

export default function ListContactCard({ id, first_name, last_name, email, phone }: ContactProps) {
    const details = [
        { icon: Mail, value: email },
        { icon: Phone, value: phone },
    ]

    return (
        <Card className="h-47 justify-center border-2 border-primary bg-gray-100/50 gap-2">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-1 flex justify-center items-center">
                        <CircleUserRound color="white" size={25} />
                    </div>
                    <h2 className="text-xl font-bold">
                        {`${first_name} ${last_name}`}
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
                    <Button className="cursor-pointer">
                        <>
                            <SquarePen size={12} />
                            <p className="text-sm">Edit</p>
                        </>
                    </Button>
                    <DeleteContactDialog contactId={id} />
                </div>
            </CardContent>
        </Card>
    )
}