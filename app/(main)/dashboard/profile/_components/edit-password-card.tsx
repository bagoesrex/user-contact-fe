import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyRound } from "lucide-react";
import EditPasswordForm from "./edit-password-form";

export default function EditPasswordCard() {
    return (
        <Card className="justify-center border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-2.5 flex justify-center items-center">
                        <KeyRound color="white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold">
                        Change Password
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <EditPasswordForm />
            </CardContent>
        </Card>
    )
}