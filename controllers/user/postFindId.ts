import { Request, Response } from "express";
import User from "../../models/user";

const postFindId = (req: Request, res: Response) => {
  const name = req.body.name;

  User.findOne({ name: name })
    .then((result) => {
      console.log(result);
      if (!result) {
        res.status(432).send({ message: "가입하지 않은 닉네임이에요." });
      } else {
        const id = result.id;
        res.status(200).send({ id: id });
      }
    })
    .catch((err) => console.log(err));
};

export default postFindId;
