"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
    username: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (u: User | null) => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    refreshUser: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    async function refreshUser() {
        try {
            const res = await fetch("/api/users/current");
            const data = await res.json();

            if (!res.ok) {
                setUser(null);
                return;
            }

            setUser(data.user || null)
        } catch (err) {
            console.error(err);
            setUser(null);
        }
    }

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext)
