import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requiired: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["instructor", "student"],
        default: "student",
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            // This will create a "courses" field in the "users" collection that stores references to the "Course" documents
            ref: "Course",
        },
    ],
    photoUrl: {
        type: String,
        default: "default.jpg",
    },
    timestamps: true,
});

export default mongoose.model("User", userSchema);
