import { Role, User } from '@prisma/client';
import prisma from '../client';

export async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  role: Role
): Promise<User> {
  return await prisma.user.create({
    data: {
      email,
      password,
      firstname,
      lastname,
      role,
    },
  });
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
