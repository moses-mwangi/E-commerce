import { Router } from "express";
import {
  getAllUser,
  testing,
  updateUser,
} from "../controllers/usersController";

const router: Router = Router();

router.route("/").post(testing).get(getAllUser);
router.route("/:id").patch(updateUser);

export default router;
