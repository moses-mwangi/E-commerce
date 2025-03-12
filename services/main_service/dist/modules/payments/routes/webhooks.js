"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhooksHandler_1 = require("../controllers/webhooksHandler");
dotenv_1.default.config();
const router = express_1.default.Router();
router.route("/webhooks/stripe").post(webhooksHandler_1.webHook);
exports.default = router;
