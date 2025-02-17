import express from "express";
import dotenv from "dotenv";
import { webHook } from "../controllers/webhooksHandler";

dotenv.config();
const router = express.Router();

router.route("/webhooks/stripe").post(webHook);

export default router;
