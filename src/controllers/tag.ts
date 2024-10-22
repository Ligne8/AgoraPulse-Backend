import { Request, Response } from 'express';
import { findAll } from '../models/tags';
import { Tags } from '@prisma/client';

export async function getTags(_: Request, res: Response): Promise<void> {
  const tags: Tags[] = await findAll();
  res.send({ tags: tags });
  return;
}
