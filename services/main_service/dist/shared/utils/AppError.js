"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Captures stack trace (excluding constructor call)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
