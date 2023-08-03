import mongoose from "mongoose";

export const userSchema = mongoose.model(
    "user",
    new mongoose.Schema({
        name: {
            type: String
        },
        username: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
        },
        contact: {
            type: Number
        },
        image: {
            type: String
        },
        token:{
            type: String,
            default: ''
        }
    }, { timestamps: true })
);