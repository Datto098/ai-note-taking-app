import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import db from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: Request, { params }: RouteParams) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const noteId = params.id;

        if (!noteId) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        await db.connectDB();
        const note = await db.Note.findOne({
            _id: new ObjectId(noteId),
            userId: session.user.id,
        });

        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(note);
    } catch (error) {
        console.error("Error fetching note:", error);
        return NextResponse.json(
            { error: "Error fetching note" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const noteId = params.id;

        if (!noteId) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        await db.connectDB();
        const note = await db.Note.findOneAndUpdate(
            { _id: new ObjectId(noteId), userId: session.user.id },
            { $set: body },
            { new: true }
        );

        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(note);
    } catch (error) {
        console.error("Error updating note:", error);
        return NextResponse.json(
            { error: "Error updating note" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const noteId = params.id;

        if (!noteId) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        await db.connectDB();
        const note = await db.Note.findOneAndDelete({
            _id: new ObjectId(noteId),
            userId: session.user.id,
        });

        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        return NextResponse.json(
            { error: "Error deleting note" },
            { status: 500 }
        );
    }
}
