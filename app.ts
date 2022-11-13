import express from "express";
import bodyParser from "body-parser";
import sequelize from "./utils/database";

import userRoutes from "./routes/user";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(userRoutes);

sequelize
    .sync()
    .then(() => {
        console.log('성공')
        app.listen(8080);
    })
    .catch((err) => console.log(err));