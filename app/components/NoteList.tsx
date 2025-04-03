"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Note {
    _id: string;
    title: string;
    summary: string;
    tags: string[];
}

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchNotes = async () => {
        try {
            const response = await fetch("/api/notes");
            console.log(response);
            if (!response.ok) {
                throw new Error("Không thể tải danh sách ghi chú");
            }
            const data = await response.json();

            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Có lỗi xảy ra khi tải danh sách ghi chú"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) {
            return;
        }

        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Không thể xóa ghi chú");
            }

            // Cập nhật danh sách notes
            setNotes(notes.filter((note) => note._id !== id));
            // Refresh trang
            router.refresh();
        } catch (error) {
            console.error("Error deleting note:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Có lỗi xảy ra khi xóa ghi chú"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {notes.map((note) => (
                <div
                    key={note._id}
                    className="p-4 border rounded hover:bg-gray-50"
                >
                    <div className="flex justify-between items-start mb-2">
                        <Link href={`/notes/${note._id}`} className="flex-1">
                            <h2 className="text-xl font-semibold">
                                {note.title}
                            </h2>
                        </Link>
                        <button
                            onClick={() => handleDelete(note._id)}
                            className="text-red-600 hover:text-red-800"
                        >
                            Xóa
                        </button>
                    </div>
                    <p className="text-gray-600 mb-2">{note.summary}</p>
                    {note.tags && note.tags.length > 0 && (
                        <div className="flex gap-2">
                            {note.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
