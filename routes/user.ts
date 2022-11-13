import express from "express";
import postSignUp from "../controllers/user/postSignUp";

const router = express.Router();

router.post('/signup', postSignUp);

export default router;