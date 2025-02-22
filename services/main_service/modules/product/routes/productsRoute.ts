import { Router } from "express";
import {
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOneProduct,
} from "../controllers/productController";
import upload from "../middleware/upload";

const router: Router = Router();

router.route("/").get(getAllProduct).post(upload, createProduct);
// router.route("/").get(getAllProduct).post(createProduct);

router
  .route("/:id")
  .delete(deleteProduct)
  .patch(updateProduct)
  .get(getOneProduct);

export default router;
