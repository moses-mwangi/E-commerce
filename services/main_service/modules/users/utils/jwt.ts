import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = String(process.env.JWT_SECRET_KEY) || "your-refresh-secret";
// const secretKey: Secret = process.env.JWT_SECRET_KEY || "your-refresh-secret";

export const generateToken = (
  user: { id: number; email: string },
  expiresIn = "1h"
) => {
  // const token = jwt.sign(user, secretKey as string, { expiresIn: expiresIn });
  const token = jwt.sign(user, secretKey, { expiresIn: expiresIn });

  return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
