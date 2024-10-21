import express, { Request, Response } from "express";
import { ValidateEmail } from "../utils/utils";
import { comparePassword, hashPassword, generateToken } from "../services/user";

import { createUser, getUser } from "../models/user";
import { User } from "@prisma/client";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, firstname, lastname, role } = req.body;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
  if (!ValidateEmail(email)) {
    res.status(400).send("Invalid email");
    return;
  }
  const hashedPassword = await hashPassword(password);
  try {
    const user = await createUser(
      email,
      hashedPassword,
      firstname,
      lastname,
      role
    );
    res.send(user);
  } catch (error: any) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      res.status(400).send("Email already exists");
      return;
    } else {
      res.status(500).send("Error creating user");
      return;
    }
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Email and password are required");
    return;
  }
  let user: User;
  user = await getUser(email);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  if (!(await comparePassword(password, user.password))) {
    res.status(401).send("Invalid password");
    return;
  }
  const token = generateToken(user.id);
  res.header("Authorization", token);
  res.send({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
  });
  return;
};
