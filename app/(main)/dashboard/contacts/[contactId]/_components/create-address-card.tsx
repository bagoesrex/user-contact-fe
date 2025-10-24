import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function CreateAddressCard() {
    return (
        <Card className="h-47 justify-center items-center border-2 border-dashed border-primary bg-gray-100/50 cursor-pointer">
            <CardContent className="flex flex-col justify-center items-center gap-3">
                <div className="bg-primary rounded-full size-fit p-3 flex justify-center items-center">
                    <Plus color="white" size={32} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">Create New Address</h2>
                </div>
            </CardContent>
        </Card>
    )
}