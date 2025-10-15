import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleUserRound, Mail, Phone } from "lucide-react"

interface ContactProps {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}

export default function ContactCard({ id, first_name, last_name, email, phone }: ContactProps) {
    const details = [
        { icon: Mail, value: email },
        { icon: Phone, value: phone },
    ]

    return (
        <Card className="max-h-50 justify-center border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-1 flex justify-center items-center">
                        <CircleUserRound color="white" size={32} />
                    </div>
                    <h2 className="text-xl font-bold">
                        {`${first_name} ${last_name}`}
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center px-10 gap-3 font-sans text-sm">
                {details.map(({ icon: Icon, value }, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <Icon className="text-primary" size={22} />
                        <span className="truncate overflow-hidden whitespace-nowrap max-w-[180px]">{value}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}