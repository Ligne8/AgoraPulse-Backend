import express, { Router, Request, Response } from "express";

import { signUp } from "../controllers/user";

const router: Router = express.Router();

router.post("/signup", signUp);

export default router;
