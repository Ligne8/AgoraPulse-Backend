import { Tags } from '@prisma/client';
import prisma from '../client';

export async function findAll(): Promise<Tags[]> {
  return await prisma.tags.findMany();
}
