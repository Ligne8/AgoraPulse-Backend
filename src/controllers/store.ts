import { Request, Response } from 'express';
import { BasicStore, create, findById, findByUserId } from '../models/store';
import { Store } from '@prisma/client';

export async function createStore(req: Request, res: Response): Promise<void> {
  const BasicStore: BasicStore = {
    name: req.body.name,
    description: req.body.description,
    webUrl: req.body.web_url,
    address: req.body.address,
  };
  const userId: string = req.body.user_id;
  try {
    create(BasicStore, userId);
  } catch (e) {
    res.status(500).send(e);
  }
  res.status(201).send('Store created');
}

export async function getStoreByUserId(req: Request, res: Response): Promise<void> {
  const userId: string = req.params.user_id;
  const store: Store | null = await findByUserId(userId);
  if (!store) {
    res.status(404).send('Store not found');
    return;
  }
  res.send(store);
}

export async function getStoreById(req: Request, res: Response): Promise<void> {
  const storeId: string = req.params.store_id;
  const store: Store | null = await findById(storeId);
  if (!store) {
    res.status(404).send('Store not found');
    return;
  }
  res.send(store);
}
