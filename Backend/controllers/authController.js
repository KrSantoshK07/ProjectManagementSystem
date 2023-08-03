import asyncHandler from "express-async-handler";
import { userSchema } from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import sendMail from '../config/emailSender.js';
import Randomstring from "randomstring";


//@desc register user
//@route POST /api/user/register
//@access public
export const register = asyncHandler(async (req, res) => {
    const { name, username, email, contact, password, cpassword } = req.body;
    const url = req.file.filename;

    if (!name || !username || !email || !password || !cpassword || !url) {
        res.status(200);
        throw new Error("All fields are mandatory");
    }

    const existUser = await userSchema.find({ email });

    if (existUser.length != 0) {
        res.status(200);
        throw new Error("Email already registered")
    }

    const existUsername = await userSchema.find({ username });
    if (existUsername.length != 0) {
        res.status(200);
        throw new Error("Username Already taken")
    }

    if (password === cpassword) {
        const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
        const data = await userSchema.create({
            name,
            username,
            email,
            password: hashPassword,
            contact,
            image: url
        })
        res.status(200).json({ "statusCode": 200, "message": "user Registered" })
    } else {
        res.status(200);
        throw new Error("Passwords not matched!");
    }
});

//@desc login user
//@route POST /api/user/register
//@access public
export const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const credentials = !username ? email : username;

    if ((!password && !username) || (!password && !email)) {
        res.status(200);
        throw new Error("All fields are mandatory")
    }

    const user = await userSchema.findOne({ $or: [{ email: credentials }, { username: credentials }] });
    if (!user) {
        res.status(200);
        throw new Error("User not Registered!")
    }

    const validatePassowrd = await bcrypt.compare(password, user.password);
    if (validatePassowrd) {
        const token = jwt.sign({
            email: user.email,
            userId: user._id
        }, process.env.TOKEN_SECRET, { expiresIn: "24h" })

        res.status(200).json({ "statusCode": 200, "message": "Login Successfully", "token": token })
    } else {
        res.status(200).json({ "statusCode": 400, "message": "Invalid Credentials" })
    }
})

//@desc get user by id
//@route GET /api/user/get/:id
//@access private
export const getUserById = asyncHandler(async (req, res) => {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
        res.status(200);
        throw new Error("User not found");
    } else {
        res.status(200).json(user)
    }
});

//@desc get all users
//@route GET /api/user/get
//@access private
export const getUser = asyncHandler(async (req, res) => {
    const data = await userSchema.find();
    if (!data) {
        res.status(200);
        throw new Error("Users not found!")
    } else {
        res.status(200).json({ "message": "User List", "data": data })
    }
});

//@desc update user by id
//@route PUT /api/user/update/:id
//@access private
export const updateUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const requestData = req.body;

    const user = await userSchema.findById(id);
    if (!user) {
        res.status(200);
        throw new Error("User not found");
    }

    const updatedUser = await userSchema.findByIdAndUpdate(id, requestData, { new: true });
    res.status(200).json({ "message": "User Updated", "data": updateUser })

});

//@desc delete user by id
//@route POST /api/user/delete/:id
//@access private
export const deleteUser = asyncHandler(async (req, res) => {
    const data = await userSchema.findOneAndDelete(req.params.id);
    res.status(200).json({ "message": "user deleted" })
})

//@desc forget password user by id
//@route POST /api/user/forgetPassword
//@access public
export const forgetPassword = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const data = await userSchema.findOne({ email });

    if (data) {
        const newToken = jwt.sign({
            email: data.email,
            userId: data._id
        }, process.env.TOKEN_SECRET, { expiresIn: "5m" })

        await userSchema.updateOne({ email }, { $set: { token: newToken } })

        const uniqueString = Randomstring.generate();

        const flag = await sendMail({ name: data.name, email: data.email, token: newToken, template: "forgetPassword", subject: "Forget Password Link" });

        return res.status(200).json({ "statusCode": 200, flag, data, uniqueString })
    }

    res.status(404).json({ "statusCode": 404, "message": "User not found!" })
})

//@desc reset password user by id
//@route POST /api/user/resetPassword
//@access public
export const resetPassword = asyncHandler(async (req, res) => {
    const token = req.query.token;
    const { password, confirmPassword } = req.body;

    const tokenData = await userSchema.findOne({ token: token });
    
    if (tokenData) {
        jwt.verify(tokenData.token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).json({ "statusCode": 401, "message": "Link expired!" });
            }
            else {
                if (password === confirmPassword) {
                    const hashPassword = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));

                    await userSchema.updateOne({ token }, { $set: { password: hashPassword, token: '' } },{new: true});

                    res.status(200).json({ "statusCode": 200, "message": 'Password Changed' })
                } else {
                    res.status(404).json({ "statusCode": 200, "message": "Passwords not matched" })
                }
            }
        })
    } else {
        res.status(200).json({ "statusCode": 200, "message": "User not found" });
    }
})