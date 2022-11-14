import User from "../../models/user";
import {Request, Response} from "express";
import {createHashedPassword} from "../../utils/encrypt";

interface ReqBodyType {
    id: string;
    password: string;
    name: string;
    answer: string;
}

// 아이디 유효성 체크
const checkIdValidation = (id: string) => {
    const idRegExp = /^[a-z0-9]{5,12}$/;
    return idRegExp.test(id);
};

// 아이디 중복 체크
const checkIdInDB = async (id: string) =>
    await User.findOne({id: id});

// 비밀번호 유효성 체크
const checkPwdValidation = (pwd: string) => {
    const pwdRegExp =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    return pwdRegExp.test(pwd);
};

// 닉네임 유효성 체크
const checkNameValidation = (name: string) => {
    const nameRegExp = /^[A-Za-z0-9가-힣]{2,6}$/;
    return nameRegExp.test(name);
};

// 닉네임 중복 체크
const checkNameInDB = async (name: string) =>
    await User.findOne({name: name});

const postSignUp = async (req: Request, res: Response) => {
    const body: ReqBodyType = req.body;
    const isValid =
        checkIdValidation(body.id) &&
        checkPwdValidation(body.password) &&
        checkNameValidation(body.name);
    const isIdInDB = await checkIdInDB(body.id);
    const isNameInDB = await checkNameInDB(body.name);

    if (!checkIdValidation(body.id)) {
        res.status(411).send({message: "아이디 형식을 한번 더 확인해주세요."});
    }

    if (!checkPwdValidation(body.password)) {
        res.status(420).send({message: "비밀번호 형식을 한번 더 확인해주세요."});
    }
    if (!checkNameValidation(body.name)) {
        res.status(431).send({message: "닉네임 형식을 한번 더 확인해주세요."});
    }

    if (isIdInDB) {
        res.status(410).send({message: "이미 사용중인 아이디예요."});
    } else if (isNameInDB) {
        res.status(430).send({message: "이미 사용중인 닉네임이에요."});
    }

    if (isValid && !isIdInDB && !isNameInDB) {
        const {hashedPassword, salt} = await createHashedPassword(body.password);
        const user = new User({
                id: body.id,
                password: hashedPassword,
                salt: salt,
                name: body.name,
                pic: null,
                answer: body.answer,
                games: 0,
                win: 0,
                isLeave: false,
                cats: null,
                token: null,
            }
        );
        user.save()
            .then(() => res.status(200).send())
            .catch(err => console.log(err));
    }
};

export default postSignUp;
