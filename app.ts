import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import sequelize from "./utils/database";

import userRoutes from "./routes/user";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(userRoutes);

sequelize
    .sync()
    .then(() => {
        console.log('연결')
        app.listen(8080);
    })
    .catch((err) => console.log(err));