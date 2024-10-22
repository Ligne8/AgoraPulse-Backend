import express, { Router } from 'express';

import { addClientTags } from '../controllers/client';
import { getTags } from '../controllers/tag';

const router: Router = express.Router();

router.post('/client/:client_id', addClientTags);
router.get('/', getTags);

export default router;
