import mongoose from "mongoose";

export const projectSchema = mongoose.model(
    "project",
    new mongoose.Schema({
        name: {
            type: String
        },
        details: {
            type: String,
        },
        demoLink: {
            type: String,
        },
        gitLink: {
            type: String,
        },
        image: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }, { timestamps: true })
);