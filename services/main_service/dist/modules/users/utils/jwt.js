"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const secretKey = String(process.env.JWT_SECRET_KEY) || "your-refresh-secret";
const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}
const generateToken = (user, expiresIn = "1h") => {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (err) {
        throw new Error("Invalid or expired token");
    }
};
exports.verifyToken = verifyToken;
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
