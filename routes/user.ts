import express from "express";
import postSignUp from "../controllers/user/postSignUp";
import postLogIn from "../controllers/user/postLogIn";
import postFindId from "../controllers/user/postFindId";
import postFindPwd from "../controllers/user/postFindPwd";
import putResetPwd from "../controllers/user/putResetPwd";
import getUser from "../controllers/user/getUser";

const router = express.Router();

router.post("/signup", postSignUp);

router.post("/login", postLogIn);

router.post("/find-id", postFindId);

router.post("/find-pwd", postFindPwd);

router.put("/reset-pwd", putResetPwd);

router.get("/user", getUser);

export default router;
