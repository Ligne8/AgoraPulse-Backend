import express, { Router } from 'express';

import { signUp, signIn } from '../controllers/user';
import { addClientTags } from '../controllers/client';

const router: Router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/tags/:user_id', addClientTags);

export default router;
