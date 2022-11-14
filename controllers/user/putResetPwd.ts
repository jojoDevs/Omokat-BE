import { Request, Response } from "express";
import User from "../../models/user";
import { createHashedPassword } from "../../utils/encrypt";

const checkPwdValidation = (pwd: string) => {
  const pwdRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  return pwdRegExp.test(pwd);
};

const putResetPwd = async (req: Request, res: Response) => {
  const id = req.body.id;
  const password = req.body.password;

  if (checkPwdValidation(password)) {
    const { hashedPassword, salt } = await createHashedPassword(password);

    User.findOne({ id: id })
      .then((result) => {
        if (result) {
          result.password = hashedPassword;
          result.salt = salt;
          return result?.save();
        }
      })
      .then(() => res.status(200).send())
      .catch((err) => console.log(err));
  } else {
    res.status(420).send({ message: "비밀번호 형식을 한번 더 확인해주세요." });
  }
};

export default putResetPwd;
