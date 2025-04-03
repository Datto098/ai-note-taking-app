import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import db from "@/app/lib/mongodb";
import NoteEditor from "@/app/components/NoteEditor";

interface NotePageProps {
    params: {
        id: string;
    };
}

export default async function NotePage({ params }: NotePageProps) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <p>Vui lòng đăng nhập để xem ghi chú.</p>
            </div>
        );
    }

    const noteId = params.id;

    // Nếu id là "new", trả về form trống để tạo ghi chú mới
    if (noteId === "new") {
        return (
            <div className="max-w-4xl mx-auto p-4">
                <NoteEditor
                    initialData={{
                        title: "",
                        content: "",
                        summary: "",
                        tags: [],
                    }}
                />
            </div>
        );
    }

    try {
        await db.connectDB();
        const note = await db.Note.findOne({
            _id: noteId,
            userId: session.user.id,
        });

        if (!note) {
            return (
                <div className="max-w-4xl mx-auto p-4">
                    <p>Không tìm thấy ghi chú.</p>
                </div>
            );
        }

        // Chuyển đổi dữ liệu MongoDB thành plain object
        const noteData = {
            _id: note._id.toString(),
            title: note.title,
            content: note.content,
            summary: note.summary,
            tags: note.tags || [],
        };

        return (
            <div className="max-w-4xl mx-auto p-4">
                <NoteEditor initialData={noteData} />
            </div>
        );
    } catch (error) {
        console.error("Error fetching note:", error);
        return (
            <div className="max-w-4xl mx-auto p-4">
                <p>Có lỗi xảy ra khi tải ghi chú.</p>
            </div>
        );
    }
}
