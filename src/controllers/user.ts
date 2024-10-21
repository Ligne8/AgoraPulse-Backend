import express, { Request, Response } from "express";
import { ValidateEmail } from "../utils/utils";

import { createUser } from "../models/user";

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
  try {
    const user = await createUser(email, password, firstname, lastname, role);
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
  res.send({ email, password });
};
