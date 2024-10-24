import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { getUserById } from '../models/user';
import { User } from '@prisma/client';
import { addTag, getTags } from '../models/client';

// accept an array of tags in the request body
export async function addClientTags(req: Request, res: Response): Promise<void> {
  const { client_id } = req.params;
  const { tags } = req.body;
  if (!tags || !Array.isArray(tags)) {
    res.status(400).send('Tags must be an array');
    return;
  }
  const user: User | null = await getUserById(client_id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  for (const tag of tags) {
    if (typeof tag !== 'string') {
      res.status(400).send('Tags must be strings');
      return;
    }
    try {
      await addTag(user.id, tag);
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // association already exists
          continue;
        } else if (error.code === 'P2003') {
          res.sendStatus(400);
          return;
        }
      } else {
        res.status(500).send(error);
        return;
      }
    }
  }
  res.sendStatus(201);
}

export async function getClientTags(req: Request, res: Response): Promise<void> {
  const { user_id } = req.params;
  const user: User | null = await getUserById(user_id);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  res.send(await getTags(user.id));
}
