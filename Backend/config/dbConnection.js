import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const dbConnection = async () => {
    // await mongoose.connect(process.env.LOCAL_DB_STRING, {
    await mongoose.connect(process.env.DB_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res)=>{ console.log("Database Connected Successfully");})
    .catch((err) =>{ console.log(err.message);})
}

export default dbConnection;
