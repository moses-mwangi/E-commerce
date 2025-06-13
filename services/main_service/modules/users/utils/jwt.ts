import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// const secretKey = String(process.env.JWT_SECRET_KEY) || "your-refresh-secret";
const secretKey = process.env.JWT_SECRET_KEY;

if (!secretKey) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}

interface JwtPayload {
  id: number;
  email: string;
}

export const generateToken = (
  user: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "1h"
): string => {
  return jwt.sign(user, secretKey, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

// export const generateToken = (
//   user: { id: number; email: string },
//   expiresIn = "1h"
// ) => {
//   const token = jwt.sign(user, secretKey, { expiresIn });

//   return token;
// };

// export const verifyToken = (token: string) => {
//   try {
//     return jwt.verify(token, secretKey);
//   } catch (err) {
//     throw new Error("Invalid or expired token");
//   }
// };
