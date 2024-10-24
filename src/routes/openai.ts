import express, { Router } from 'express';
import { createOpenAIRequestController } from '../controllers/openai';

const router: Router = express.Router();

router.post('/', createOpenAIRequestController);

export default router;
