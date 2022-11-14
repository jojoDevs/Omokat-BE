import { Request, Response } from "express";
import Users from "../../models/users";

const postFindId = (req: Request, res: Response) => {
  const name = req.body.name;

  Users.findOne({ where: { name: name } })
    .then((result) => {
      if (!result) {
        res.status(432).send({ message: "가입하지 않은 닉네임이에요." });
      } else {
        const id = result?.dataValues.id;
        res.status(200).send({ id: id });
      }
    })
    .catch((err) => console.log(err));
};

export default postFindId;
