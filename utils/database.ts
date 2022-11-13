import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const database = String(process.env.MYSQL_DATABASE);
const username = String(process.env.MYSQL_USERNAME);
const password = String(process.env.MYSQL_PASSWORD);
const host = String(process.env.MYSQL_HOST);
const port = Number(process.env.MYSQL_PORT);

const sequelize = new Sequelize(database, username, password, {
    dialect: "mysql",
    host: host,
    port: port
});

export default sequelize;