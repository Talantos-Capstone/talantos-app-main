/**
 * Validates if a password meets security requirements.
 * 
 * @param {string} password - The password to validate.
 * @returns {string} Error message if invalid, empty string if valid.
 */

export const validatePassword = (password: string): string => {
    const minLength = password.length >= 9;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValid = minLength && hasUpperCase && hasLowerCase && hasNumber && hasSymbol;
  
    if (!isValid) {
      return "The password must contain at least 9 characters including: uppercase letters, lowercase letters, numbers, and symbols.";
    }
    return "";
  };
  