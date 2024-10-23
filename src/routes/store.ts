import express, { Router } from 'express';
import { createStore, getStoreById, getStoreByUserId } from '../controllers/store';

const router: Router = express.Router();

router.get('/:store_id', getStoreById);
router.get('/user/:user_id', getStoreByUserId);
router.post('/', createStore);

export default router;
