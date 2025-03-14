"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("../controllers/categoryController");
const router = (0, express_1.Router)();
// router.use(protect);
// Admin only routes
// router.use(restrictTo("admin"));
router
    .route("/")
    .get(categoryController_1.categoryController.getAllCategories)
    .post(categoryController_1.categoryController.createCategory);
router.get("/:identifier", categoryController_1.categoryController.getCategory);
router
    .route("/:id")
    .patch(categoryController_1.categoryController.updateCategory)
    .delete(categoryController_1.categoryController.deleteCategory);
// Subcategory routes
router.route("/:id/subcategories").post(categoryController_1.categoryController.addSubcategory);
router
    .route("/:categoryId/subcategories/:subcategoryId")
    .patch(categoryController_1.categoryController.updateSubcategory)
    .delete(categoryController_1.categoryController.removeSubcategory);
// Filter routes
router.route("/:id/filters").patch(categoryController_1.categoryController.updateFilters);
router
    .route("/:categoryId/subcategories/:subcategoryId/filters")
    .patch(categoryController_1.categoryController.updateFilters);
exports.default = router;
