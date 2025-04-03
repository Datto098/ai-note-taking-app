import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold text-center mb-8">
                    AI Note Taking App
                </h1>
                <p className="text-center mb-8">
                    Ghi chú thông minh với sự hỗ trợ của AI
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/notes"
                        className="p-6 border rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <h2 className="text-2xl font-semibold mb-2">Ghi chú</h2>
                        <p>Tạo và quản lý ghi chú của bạn</p>
                    </Link>

                    <Link
                        href="/login"
                        className="p-6 border rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <h2 className="text-2xl font-semibold mb-2">
                            Đăng nhập
                        </h2>
                        <p>Đăng nhập để bắt đầu sử dụng</p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
