"use client";

import { APP_CONFIG } from "@/config/app-config";
import { CircleUser, Contact, Loader2, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Header() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogout() {
        setIsLoading(true);

        try {
            const res = await fetch("/api/users/current", {
                method: "DELETE",
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Logout failed");
                return;
            }

            toast.success(data.message || "Logout successful");

            setTimeout(() => {
                router.push("/login");
            }, 800);
        } catch (err) {
            console.error(err);
            toast.error("Server error, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    <Button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="cursor-pointer flex items-center gap-2 hover:bg-background/20"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Logging out...
                            </>
                        ) : (
                            <>
                                <LogOut size={17} />
                                <p className="text-sm">Logout</p>
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </header>
    )
}