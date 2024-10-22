import { Request, Response } from 'express';
import { ValidateEmail } from '../utils/utils';
import { comparePassword, hashPassword } from '../services/user';
import { Prisma } from '@prisma/client';

import { createUser, getUserByEmail } from '../models/user';
import { User } from '@prisma/client';

export async function signUp(req: Request, res: Response): Promise<void> {
  const { email, password, firstname, lastname, role } = req.body;
  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }
  if (!ValidateEmail(email)) {
    res.status(400).send('Invalid email');
    return;
  }
  const hashedPassword: string = await hashPassword(password);
  try {
    await createUser(email, hashedPassword, firstname, lastname, role);
    res.sendStatus(201);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(400).send('Email already exists');
        return;
      }
    } else {
      res.status(500).send('Error creating user');
      return;
    }
  }
  return;
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }
  const user: User | null = await getUserByEmail(email);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  if (!(await comparePassword(password, user.password))) {
    res.status(401).send('Invalid password');
    return;
  }
  res.send({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  });
  return;
}
