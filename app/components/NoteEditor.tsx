"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

interface NoteEditorProps {
    initialData?: {
        _id?: string;
        title: string;
        content: string;
        summary: string;
        tags: string[];
    };
}

export default function NoteEditor({ initialData }: NoteEditorProps) {
    const router = useRouter();
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData || {
            title: "",
            content: "",
            summary: "",
            tags: [],
        },
    });

    const onSubmit = async (data: any) => {
        if (!user) {
            setError("Vui lòng đăng nhập để lưu ghi chú");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            let response;
            if (initialData?._id) {
                // Cập nhật ghi chú
                response = await fetch(`/api/notes/${initialData._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } else {
                // Tạo ghi chú mới
                response = await fetch("/api/notes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            }

            if (!response.ok) {
                throw new Error("Không thể lưu ghi chú");
            }

            const result = await response.json();
            router.push("/notes");
            router.refresh();
        } catch (error) {
            console.error("Error saving note:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Có lỗi xảy ra khi lưu ghi chú"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                >
                    Tiêu đề
                </label>
                <input
                    type="text"
                    id="title"
                    {...register("title", { required: "Tiêu đề là bắt buộc" })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700"
                >
                    Nội dung
                </label>
                <textarea
                    id="content"
                    rows={10}
                    {...register("content", {
                        required: "Nội dung là bắt buộc",
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.content && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.content.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700"
                >
                    Tags (phân cách bằng dấu phẩy)
                </label>
                <input
                    type="text"
                    id="tags"
                    {...register("tags")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                    {isSubmitting ? "Đang lưu..." : "Lưu"}
                </button>
            </div>
        </form>
    );
}
