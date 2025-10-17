import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditCardProps {
    title: string
    icon: LucideIcon
    children: React.ReactNode
}

export default function EditCard({ title, icon: Icon, children }: EditCardProps) {
    return (
        <Card className="justify-center border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-2.5 flex justify-center items-center">
                        <Icon color="white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold">{title}</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )
}