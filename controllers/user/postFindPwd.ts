import { Request, Response } from "express";
import { send } from "process";
import Users from "../../models/users";

const postFindPwd = (req: Request, res: Response) => {
  const id = req.body.id;
  const answer = req.body.answer;

  Users.findOne({ where: { id: id } })
    .then((result) => {
      if (!result) {
        res.status(412).send({ message: "가입하지 않은 아이디예요." });
      } else {
        const userAnswer = result?.dataValues.answer;
        if (answer === userAnswer) res.status(200).send();
        else res.status(422).send({ message: "비밀번호 찾기 답변이 달라요." });
      }
    })
    .catch((err) => console.log(err));
};

export default postFindPwd;
