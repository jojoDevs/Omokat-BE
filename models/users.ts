import Sequelize from "sequelize";
import sequelize from "../utils/database";

const Users = sequelize.define("users", {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pic: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    games: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    win: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
})

export default Users;