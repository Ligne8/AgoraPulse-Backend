import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser: any = async (
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  role: Role
) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      firstname,
      lastname,
      role,
    },
  });
};

export const getUser: any = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
