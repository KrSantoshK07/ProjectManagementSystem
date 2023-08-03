import mongoose from "mongoose";

export const querySchema = mongoose.model(
    "query",
    new mongoose.Schema({
        reply: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project'
        }
    }, { timestamps: true })
);