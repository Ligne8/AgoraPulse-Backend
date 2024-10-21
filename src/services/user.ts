import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const secretKey = process.env.SECRET_KEY_JWT || "gamberge";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

export const generateToken = (userId: string): string => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string): string | object => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
