"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NoteList from "@/app/components/NoteList";

export default function NotesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Danh sách ghi chú</h1>
                <Link
                    href="/notes/new"
                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                >
                    Tạo ghi chú mới
                </Link>
            </div>

            <NoteList />
        </div>
    );
}
