"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface AuthContextType {
    user: {
        id: string;
        name: string;
        email: string;
    } | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<AuthContextType["user"]>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                id: session.user.id,
                name: session.user.name || "",
                email: session.user.email || "",
            });
        } else {
            setUser(null);
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading: status === "loading",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
