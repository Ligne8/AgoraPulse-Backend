import { Request, Response } from 'express';
import { ValidateEmail } from '../utils/utils';
import { comparePassword, hashPassword, generateToken } from '../services/user';
import { Prisma } from '@prisma/client';

import { createUser, getUser } from '../models/user';
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
    const user: User = await createUser(email, hashedPassword, firstname, lastname, role);
    res.send(user);
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
  const user: User | null = await getUser(email);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  if (!(await comparePassword(password, user.password))) {
    res.status(401).send('Invalid password');
    return;
  }
  const token: string = generateToken(user.id);
  res.header('Authorization', token);
  res.send({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  });
  return;
}
