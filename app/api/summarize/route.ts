import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Khởi tạo Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received request body:", body);

        const { content } = body;

        if (!content) {
            console.error("Content is missing");
            return NextResponse.json(
                { error: "Nội dung không được để trống" },
                { status: 400 }
            );
        }

        if (!process.env.GOOGLE_AI_API_KEY) {
            console.error("Google AI API key is missing");
            return NextResponse.json(
                { error: "Google AI API key chưa được cấu hình" },
                { status: 500 }
            );
        }

        // Khởi tạo model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Tạo prompt
        const prompt = `Hãy tóm tắt nội dung sau đây một cách ngắn gọn và súc tích (không quá 150 từ):

${content}`;

        // Gọi API
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        console.log("Generated summary:", summary);
        return NextResponse.json({ summary });
    } catch (error) {
        console.error("Error generating summary:", error);

        if (error instanceof Error) {
            console.error("Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack,
            });
        }

        return NextResponse.json(
            { error: "Có lỗi xảy ra khi tạo tóm tắt" },
            { status: 500 }
        );
    }
}
