import bcrypt from 'bcrypt';

const saltRounds: number = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}
