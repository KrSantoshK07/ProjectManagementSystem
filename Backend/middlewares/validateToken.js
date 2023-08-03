import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const validateToken = asyncHandler(async (req, res, next) => {
    let token = req.headers.Authorization || req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not Authorized", err)
            }
            next();
        })
    } else {
        res.status(400);
        throw new Error("User not Authorized or Token Expired")
    }
})

export default validateToken;