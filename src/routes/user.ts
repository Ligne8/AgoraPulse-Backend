import express, { Router, Request, Response } from "express";

import { signUp, signIn } from "../controllers/user";

const router: Router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
