import express from "express";
import {test} from "../controllers/user";

const router = express.Router();

router.get('/signup', test);

export default router;