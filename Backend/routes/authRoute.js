import express from 'express';
const router = express.Router();
import validateToken from '../middlewares/validateToken.js';
import profileUpload from '../utils/profileMulter.js'
import {
    register, login,
    getUser, updateUser,
    deleteUser, getUserById,
    forgetPassword, resetPassword,
} from '../controllers/authController.js';

router.post('/register', profileUpload.single("image"), register);
router.post('/login', login);
// router.get('/get', validateToken, getUser);
router.get('/get', getUser);
router.get('/get/:id', validateToken, getUserById)
router.put('/update/:id', validateToken, updateUser);
router.delete('/delete/:id', validateToken, deleteUser);

router.post('/forgetPassword', forgetPassword)
router.post('/resetPassword', resetPassword)


export default router;
