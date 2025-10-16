import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRoundPen } from "lucide-react";
import EditProfileForm from "./edit-profile-form";

export default function EditProfileCard() {
    return (
        <Card className="justify-center border-2 border-primary bg-gray-100/50">
            <CardHeader>
                <CardTitle className="flex flex-row items-center gap-3">
                    <div className="bg-primary rounded-full size-fit p-2.5 flex justify-center items-center">
                        <UserRoundPen color="white" size={20} />
                    </div>
                    <h2 className="text-xl font-bold">
                        Edit Profile
                    </h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <EditProfileForm />
            </CardContent>
        </Card>
    )
}