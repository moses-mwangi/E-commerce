"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
// router.route("/").get(getAllProduct).post(upload, createProduct);
router.route("/").get(productController_1.getAllProduct).post(productController_1.createProduct);
router
    .route("/:id")
    .delete(productController_1.deleteProduct)
    .patch(productController_1.updateProduct)
    .get(productController_1.getOneProduct);
exports.default = router;
