import asyncHandler from "express-async-handler";
import { projectSchema } from "../models/projectModel.js";
import { querySchema } from "../models/queryModel.js";
import dotenv from 'dotenv';
dotenv.config();

//@desc add project
//@route POST /api/project/add
//@access private
export const createProject = asyncHandler(async (req, res) => {
    const { name, details, demoLink, gitLink } = req.body.data;
    const userId = req.body.userId;
    
    if (!name || !details || !demoLink || !gitLink) {
        res.status(200);
        throw new Error("All fields are mandatory");
    }

    const data = await projectSchema.create({
        name,
        details,
        demoLink,
        gitLink,
        userId,
    })
    if (!data) {
        res.status(200);
        throw new Error("Error in uploading image")
    }
    res.status(200).json({ "statusCode": 200, "message": "Project Created", })
});

//@desc get project by id
//@route GET /api/project/getById/:id
//@access private
export const getProjectByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const data = await projectSchema.find({ userId });

    res.status(200).json({ "statusCode": 200, "data": data });
})

//@desc get project by userId
//@route GET /api/project/get
//@access private
export const getProject = asyncHandler(async (req, res) => {

    const data = await projectSchema.find();

    res.status(200).json({ "statusCode": 200, "data": data });
})

//@desc reply on queries
//@route POST /api/project/reply
//@access private
export const replyConversation = asyncHandler(async (req, res) => {
    const answer = req.body.data.answer;
    const userId = req.body.userId;
    const projectId = req.params.projectId;
    if (!userId || !answer) {
        res.status(200);
        throw new Error('Field mandatory')
    }

    const data = await querySchema.create({ reply: answer, userId, projectId });

    res.status(200).json({ "statusCode": 200, "message": "Replied" })
})

//@desc get Conversation
//@route GET /api/project/getReply
//@access private
export const getReply = asyncHandler(async (req, res) => {
    const projectId = req.params.projectId;

    const data = await querySchema.find({ projectId }).populate('userId');

    res.status(200).json({ "statusCode": 200, "data": data });
})

//@desc get project getProjectById
//@route GET /api/project/getProjectById
//@access private
export const getProjectById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const result = await projectSchema.findById(id)
    if (result) {
        res.status(200).json({ "statusCode": 200, data: result })
    } else {
        res.status(200).json({ "statusCode": 400, message: "Data Not found" })
    }
})

//@desc get project getProjectById
//@route GET /api/project/getProjectById
//@access private
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const updateResult = await projectSchema.findByIdAndUpdate(id, data, { new: true })

    if (updateResult.length != 0) {
        res.status(200).json({ "statusCode": 200, data: updateResult })
    } else {
        res.status(200).json({ "statusCode": 400, message: "Data Not found" })
    }
})

//@desc delete project getById
//@route GET /api/project/deleteProject
//@access private
export const deleteProject = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deleteResult = await projectSchema.findByIdAndDelete(id);

    if (deleteResult.length != 0) {
        res.status(200).json({ "statusCode": 200, data: deleteResult })
    } else {
        res.status(200).json({ "statusCode": 400, message: "Data Not found" })
    }
})

//@desc raise Issue
//@route POST /api/project/raiseIssue
//@access private
export const raiseIssue = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const projectId = req.params.projectId;
    const issue = req.body.issue;

    const data = await querySchema.create({
        reply: issue,
        userId: id,
        projectId
    });

    if (data.length != 0) {
        res.status(200).json({ "statusCode": 200, "message": "Issue submitted!" })
    } else {
        res.status(200).json({ "statusCode": 400, message: "Issue not submitted!" })
    }
})

//@desc get Issues
//@route GET /api/project/raiseIssue
//@access private
export const getIssue = asyncHandler(async (req, res) => {
    const projectId = req.params.projectId;

    const data = await querySchema.find({ projectId }).populate("userId");
    if (data.length != 0) {
        res.status(200).json({ "statusCode": 200, data: data })
    } else {
        res.status(200).json({ "statusCode": 400, message: "No issue found!" })
    }
})
