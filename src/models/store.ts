import { Store } from '@prisma/client';
import prisma from '../client';

export interface BasicStore {
  name: string;
  description: string;
  webUrl?: string;
  address?: string;
}

export async function create(data: BasicStore, userId: string): Promise<Store> {
  return prisma.store.create({
    data: {
      name: data.name,
      description: data.description,
      webUrl: data.webUrl,
      address: data.address,
      userId,
    },
  });
}

export async function findByUserId(userId: string): Promise<Store | null> {
  return prisma.store.findFirst({
    where: {
      userId,
    },
  });
}

export async function findById(storeId: string): Promise<Store | null> {
  return prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });
}
