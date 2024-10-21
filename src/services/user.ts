import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds: number = 10;

const secretKey: string = process.env.SECRET_KEY_JWT || 'gamberge';

export async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateToken(userId: string): string {
  const token: string = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}

export function verifyToken(token: string): string | object {
  try {
    const decoded: string | jwt.JwtPayload = jwt.verify(token, secretKey);
    return decoded;
  } catch {
    throw new Error('Invalid token');
  }
}
