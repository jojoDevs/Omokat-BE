import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import Users from "../../models/users";
import { verifyPassword } from "../../utils/encrypt";

dotenv.config();

const postLogIn = async (req: Request, res: Response) => {
  const password = req.body.password;
  const id = req.body.id;
  const secretKey: Secret = String(process.env.SECRET_KEY);
  const expiresIn = String(process.env.EXPIRES_IN);
  const issuer = String(process.env.ISSUER);

  Users.findOne({ where: { id: id } })
    .then(async (result) => {
      if (!result) {
        res.status(412).send({ message: "가입하지 않은 아이디예요." });
      } else {
        const userPwd = result?.dataValues.password;
        const userSalt = result?.dataValues.salt;
        const name = result?.dataValues.name;
        const pic = result?.dataValues.pic;
        const isVerify = await verifyPassword(password, userPwd, userSalt);

        if (isVerify) {
          const token = jwt.sign({ id: id, name: name }, secretKey, {
            expiresIn: expiresIn,
            issuer: issuer,
          });
          Users.update({ token: token }, { where: { id: id } })
            .then(() => {
              res.status(200).json({ token: token, pic: pic });
            })
            .catch((err) => console.log(err));
        } else {
          res.status(421).send({ message: "비밀번호가 달라요." });
        }
      }
    })
    .catch((err) => console.log(err));
};

export default postLogIn;
