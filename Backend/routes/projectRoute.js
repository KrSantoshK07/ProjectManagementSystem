import express from 'express';
const router = express.Router();
import validateToken from '../middlewares/validateToken.js';
import projectUpload from "../utils/projectMulter.js";
import {
    createProject, getProject, getProjectByUserId, getProjectById, raiseIssue,
    replyConversation, getReply, updateProduct, deleteProject,getIssue
} from '../controllers/projectController.js';

router.post('/add', projectUpload.single('image'), createProject)
// router.post('/add', createProject)
router.get('/getById/:id', validateToken, getProjectByUserId)
router.get('/get', validateToken, getProject)
router.post('/reply/:projectId', validateToken, replyConversation)
router.get('/getReply/:projectId', validateToken, getReply)
router.get('/getProjectById/:id', validateToken, getProjectById)
router.put('/updateProduct/:id', validateToken, updateProduct)
router.delete('/deleteProject/:id', validateToken, deleteProject)
router.post('/raiseIssue/:id/:projectId', validateToken, raiseIssue)
router.get('/getIssue/:projectId', validateToken, getIssue)

export default router;