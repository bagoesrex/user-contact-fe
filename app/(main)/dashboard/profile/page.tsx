import { KeyRound, UserRoundPen } from "lucide-react";
import EditCard from "./_components/edit-card";
import EditNameForm from "./_components/edit-name-form";
import EditPasswordForm from "./_components/edit-password-form";

export default function ProfilePage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto w-full mt-14 py-2 px-2 gap-3">
            <EditCard title="Edit Profile" icon={UserRoundPen}>
                <EditNameForm />
            </EditCard>
            <EditCard title="Edit Profile" icon={KeyRound}>
                <EditPasswordForm />
            </EditCard>
        </div>
    )
}