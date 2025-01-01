import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 5000;
import dbConnect from './config/dbConnection.js'
import authRoute from './routes/authRoute.js'
import projectRoute from './routes/projectRoute.js'
import errorHandler from './middlewares/errorHandler.js';

app.use(express.json());
app.use(cors());

//app.use('/' (req, res) => {
//    res.status(200).json(status: 200, message: 'Hello World', data: []);
//})
app.use('/api/user', authRoute);
app.use('/api/project', projectRoute);

app.use(errorHandler);
app.use("/uploads/profile", express.static("uploads/profile"))

dbConnect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
