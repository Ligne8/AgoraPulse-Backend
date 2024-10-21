export function ValidateEmail(email: string): boolean {
  const re: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
