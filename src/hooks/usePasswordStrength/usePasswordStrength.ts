export interface PasswordStrengthResult {
  hasCount: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  score: number;
}

export const usePasswordStrength = (
  password: string
): PasswordStrengthResult => {
  if (!password) {
    return {
      hasCount: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
      score: 0,
    };
  }

  const hasCount = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const score = [hasCount, hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;

  return { hasCount, hasUpper, hasLower, hasNumber, hasSpecial, score };
};
