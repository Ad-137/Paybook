import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authroutes from "./routes/authroutes.js";
import userRoutes from "./routes/userRoutes.js";
import TransactionRoutes from "./routes/TransactionRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth" , authroutes);
app.use("/api/users" , userRoutes);
app.use("/api/transactions" , TransactionRoutes);

app.get( "/" , (req , res) => {
    res.send("Paybook API is running successfully ...!");
})

const port = process.env.PORT || 5000 ;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("MongoDB Connected")
        app.listen( port , () => {
            console.log(`Server is running at ${port}`)
        })
    })
    .catch((err) => {
        console.log("MongoDB Connection Error " , err)
    })