import express from "express";
import postSignUp from "../controllers/user/postSignUp";

const router = express.Router();

router.post("/signup", postSignUp);


// router.post("/login", postLogIn);
//
// router.post("/find-id", postFindId);
//
// router.post("/find-pwd", postFindPwd);
//
// router.put("/reset-pwd", putResetPwd);

export default router;
