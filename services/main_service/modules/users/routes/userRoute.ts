import { Router } from "express";
// import { getAllUser } from "../controllers/usersController";

const router: Router = Router();

router.route("/").get();

export default router;
