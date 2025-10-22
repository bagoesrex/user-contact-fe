import { ArrowLeft, IdCard, KeyRound, UserCog, UserRoundPen } from "lucide-react";
import EditCard from "./_components/edit-card";
import EditNameForm from "./_components/edit-name-form";
import EditPasswordForm from "./_components/edit-password-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="max-w-5xl mx-auto w-full mt-14 py-2 px-2 space-y-2.5">
            <div className="relative flex items-center justify-between">
                <Button variant={"link"} asChild>
                    <Link href={`/dashboard`}>
                        <ArrowLeft />
                        <span>Back to Dashboard</span>
                    </Link>
                </Button>

                <div className="absolute left-1/2 -translate-x-1/2 flex flex-row items-center gap-2">
                    <UserCog size={30} />
                    <h1 className="text-2xl font-bold">
                        Edit Profile
                    </h1>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <EditCard title="Edit Name" icon={UserRoundPen}>
                    <EditNameForm />
                </EditCard>
                <EditCard title="Edit Password" icon={KeyRound}>
                    <EditPasswordForm />
                </EditCard>
            </div>
        </div>
    )
}