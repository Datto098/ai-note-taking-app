"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === "loading";

    const signInWithGoogle = async () => {
        try {
            await signIn("google", { callbackUrl: "/notes" });
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            throw error;
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
        }
    };

    return {
        user: session?.user || null,
        loading,
        signInWithGoogle,
        signOut: handleSignOut,
    };
}
