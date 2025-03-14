import { Router } from "express";
import { createCategories } from "../controllers/categoryController1";
import { categoryController } from "../controllers/categoryController";

const router: Router = Router();

// router.use(protect);

// Admin only routes
// router.use(restrictTo("admin"));

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router.get("/:identifier", categoryController.getCategory);

router
  .route("/:id")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

// Subcategory routes
router.route("/:id/subcategories").post(categoryController.addSubcategory);

router
  .route("/:categoryId/subcategories/:subcategoryId")
  .patch(categoryController.updateSubcategory)
  .delete(categoryController.removeSubcategory);

// Filter routes
router.route("/:id/filters").patch(categoryController.updateFilters);

router
  .route("/:categoryId/subcategories/:subcategoryId/filters")
  .patch(categoryController.updateFilters);

export default router;
