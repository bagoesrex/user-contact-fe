import EditNameCard from "./_components/edit-name-card";
import EditPasswordCard from "./_components/edit-password-card";

export default function ProfilePage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto w-full mt-14 py-2 px-2 gap-3">
            <EditNameCard />
            <EditPasswordCard />
        </div>
    )
}