import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 10;

export type UserAuth = {
  id: string;
};

/**
 * Uses bcrypt to get a password hash
 */
export const getHash = (plainTextPassword: string): Promise<string> => {
  return new Promise((resolve) =>
    bcrypt.hash(plainTextPassword, saltRounds, function (err, hash) {
      resolve(hash);
    })
  );
};

/**
 * Users bcrypt to validate a password hash
 */
 export const comparePassword = (plainTextPassword: string, hash: string): Promise<boolean> => {
  return new Promise((resolve) => {
    bcrypt.compare(plainTextPassword, hash, function (err, result) {
      resolve(result);
    });
  });
 };

 export const getUserFromToken = async (token: string): Promise<UserAuth> => {
  if (token) {
    return new Promise((resolve) => {
      jwt.verify(token, process.env.COLLAB_KEY, function (err, decoded) {
        resolve(decoded);
      });
    });
  }
  return null;
};