import {Request, Response} from "express";
import User from "../../models/user";

const getUser = (req: Request, res: Response) => {
    const token = req.headers.authorization;

    User.findOne({token: token}).then(user => {
        const pic = user?.pic;
        const name = user?.name;
        const games = user?.games;
        const win = user?.win;
        const cats = user?.cats;
        res.status(200).send({pic: pic, name: name, games: games, win: win, cats: cats});
    })
};

export default getUser;