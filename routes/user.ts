import express from "express";
import postLogIn from "../controllers/user/postLogIn";
import postSignUp from "../controllers/user/postSignUp";

const router = express.Router();

router.post("/signup", postSignUp);

router.post("/login", postLogIn);

export default router;
