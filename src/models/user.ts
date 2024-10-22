import { Role, User } from '@prisma/client';
import prisma from '../client';

export async function createUser(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  role: Role
): Promise<User> {
  return prisma.user.create({
    data: {
      email,
      password,
      firstname,
      lastname,
      role,
    },
  });
}

export async function getUser(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
