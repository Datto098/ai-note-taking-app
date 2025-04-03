import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import db from "@/app/lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await db.connectDB();
        const notes = await db.Note.find({ userId: session.user.id })
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        return NextResponse.json(
            { error: "Error fetching notes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, content, tags } = body;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        // Tạo tóm tắt bằng Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = `Hãy tóm tắt nội dung sau đây một cách ngắn gọn và súc tích (không quá 150 từ):

${content}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        await db.connectDB();
        const note = new db.Note({
            title,
            content,
            summary,
            tags: tags || [],
            userId: session.user.id,
        });

        await note.save();

        return NextResponse.json(note);
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json(
            { error: "Error creating note" },
            { status: 500 }
        );
    }
}
