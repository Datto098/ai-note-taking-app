import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Vui lòng nhập tiêu đề"],
        maxlength: [100, "Tiêu đề không được quá 100 ký tự"],
    },
    content: {
        type: String,
        required: [true, "Vui lòng nhập nội dung"],
    },
    summary: {
        type: String,
        default: "",
    },
    tags: [
        {
            type: String,
            trim: true,
        },
    ],
    userId: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Tự động cập nhật updatedAt khi document được cập nhật
NoteSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
