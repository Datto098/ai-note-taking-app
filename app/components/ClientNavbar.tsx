"use client";

import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

export default function ClientNavbar() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return (
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="animate-pulse h-8 w-32 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-xl font-bold text-gray-800"
                        >
                            AI Note Taking
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link
                                    href="/notes"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Ghi chú
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Đăng nhập
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
