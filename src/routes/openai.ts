import express, { Router } from 'express';
import { createOpenAIRequest } from '../controllers/openai';

const router: Router = express.Router();

router.post('/', createOpenAIRequest);

export default router;
