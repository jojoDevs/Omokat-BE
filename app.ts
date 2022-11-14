import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import userRoutes from "./routes/user";

dotenv.config();
const dataBase = String(process.env.DB_URL)

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(userRoutes);

mongoose
    .connect(dataBase)
    .then(() => {
        console.log('서버뜸')
        app.listen(8080)
    })
    .catch(err => console.log(err));