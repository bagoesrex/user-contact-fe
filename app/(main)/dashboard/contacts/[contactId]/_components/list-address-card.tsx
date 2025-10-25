import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Address } from "@/types/address";
import { Building2, Flag, House, Map, Signpost, StretchVertical } from "lucide-react";

interface ListAddressCardProps {
    address: Address
}

export default function ListAddressCard({ address }: ListAddressCardProps) {
    const details = [
        { icon: StretchVertical, description: "Street", value: address.street },
        { icon: Building2, description: "City", value: address.city },
        { icon: Map, description: "Province", value: address.province },
        { icon: Flag, description: "Country", value: address.country },
        { icon: Signpost, description: "Postal Code", value: address.postal_code },
    ]

    return (
        <Card className="h-60 justify-center border-2 border-primary bg-gray-100/50 gap-2">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-1 flex justify-center items-center">
                        <House color="white" size={25} />
                    </div>
                    <h2 className="text-xl font-bold">
                        Home Address
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center pl-8 pr-5 gap-3 font-sans text-sm">
                {details.map(({ icon: Icon, description, value }, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div className="flex items-center gap-2 flex-shrink-0 w-36">
                            <Icon className="text-primary" size={22} />
                            <span className="truncate">{description}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="truncate">{value}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card >
    )
}