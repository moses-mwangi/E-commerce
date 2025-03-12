"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = exports.paypalRouter = exports.stripeRouter = void 0;
var stripePaymentRoute_1 = require("../payments/routes/stripePaymentRoute");
Object.defineProperty(exports, "stripeRouter", { enumerable: true, get: function () { return __importDefault(stripePaymentRoute_1).default; } });
var payPalpaymentsRoutes_1 = require("../payments/routes/payPalpaymentsRoutes");
Object.defineProperty(exports, "paypalRouter", { enumerable: true, get: function () { return __importDefault(payPalpaymentsRoutes_1).default; } });
var webhooks_1 = require("../payments/routes/webhooks");
Object.defineProperty(exports, "webhookRouter", { enumerable: true, get: function () { return __importDefault(webhooks_1).default; } });
__exportStar(require("../payments/controllers/webhooksHandler"), exports);
// export * from './controllers/userController';
// export * from './services/userService';
// export * from './models/userModel';
// export * from './routes/userRoutes';
// export * from './middlewares/userAuthMiddleware';
// export * from './validations/userValidation';
// export * from './dtos/userDTO';
