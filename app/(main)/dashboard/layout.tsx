"use client";

import Header from "@/components/layout/header";
import { AuthProvider } from "@/providers/auth-provider";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthProvider>
            <Header />
            <main>{children}</main>
        </AuthProvider>
    );
}
