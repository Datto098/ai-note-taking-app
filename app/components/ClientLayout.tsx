"use client";

import { SessionProvider } from "next-auth/react";
import ClientNavbar from "./ClientNavbar";
import { AuthProvider } from "../contexts/AuthContext";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                    <ClientNavbar />
                    <main className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </main>
                </div>
            </AuthProvider>
        </SessionProvider>
    );
}
