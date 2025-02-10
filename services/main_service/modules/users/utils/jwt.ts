import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = String(process.env.JWT_SECRET_KEY);

export const generateToken = (user: { id: number; email: string }) => {
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
