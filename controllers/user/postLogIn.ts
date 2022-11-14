import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import * as dotenv from "dotenv";
import User from "../../models/user";
import { verifyPassword } from "../../utils/encrypt";

dotenv.config();

const postLogIn = async (req: Request, res: Response) => {
  const password = req.body.password;
  const id = req.body.id;
  const secretKey: Secret = String(process.env.SECRET_KEY);
  const expiresIn = String(process.env.EXPIRES_IN);
  const issuer = String(process.env.ISSUER);

  let pic = "";
  let token = "";

  User.findOne({ id: id })
    .then(async (result) => {
      if (!result) {
        res.status(412).send({ message: "가입하지 않은 아이디예요." });
      } else {
        const userPwd = String(result.password);
        const userSalt = String(result.salt);
        const name = result.name;
        pic = String(result.pic);
        const isVerify = await verifyPassword(password, userPwd, userSalt);

        if (isVerify) {
          token = jwt.sign({ id: id, name: name }, secretKey, {
            expiresIn: expiresIn,
            issuer: issuer,
          });
          result.token = token;

          return result.save();
        }
      }
    })
    .then(() => {
      res.status(200).json({ token: token, pic: pic });
    })
    .catch((err) => console.log(err));
};

export default postLogIn;
