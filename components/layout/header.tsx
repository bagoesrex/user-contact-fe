import { APP_CONFIG } from "@/config/app-config";
import { CircleUser, Contact, LogOut } from "lucide-react";

export default function Header() {
    return (
        <header className="fixed top-0 w-full z-50 bg-primary text-primary-foreground shadow-sm">
            <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4">
                <div className="flex gap-2 items-center">
                    <Contact size={22} />
                    <h1 className="text-lg font-semibold tracking-tight">{APP_CONFIG.name}</h1>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="flex items-center gap-2">
                        <CircleUser size={17} />
                        <p className="text-sm">Profile</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <LogOut size={17} />
                        <p className="text-sm">Logout</p>
                    </div>
                </div>
            </div>
        </header>
    )
}