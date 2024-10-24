import { Tags_Users } from '@prisma/client';
import prisma from '../client';

export async function addTag(userId: string, tagId: string): Promise<Tags_Users | null> {
  return await prisma.tags_Users.create({
    data: {
      userId,
      tagId,
    },
  });
}

export async function getTags(userId: string): Promise<Tags_Users[]> {
  return await prisma.tags_Users.findMany({
    where: {
      userId,
    },
  });
}
