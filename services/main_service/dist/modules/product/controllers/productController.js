"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.updateProduct = exports.deleteProduct = exports.getAllProduct = exports.createProduct = void 0;
const productModels_1 = __importDefault(require("../models/productModels"));
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
exports.createProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { name, category, price, stock, description, discount, ratings, brand, specifications, } = req.body;
    if (!name || !category || !price || !stock || !description) {
        return next(new AppError_1.default("All fields are required", 400));
    }
    // if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    //   return next(new AppError("No files uploaded", 400));
    // }
    // const imageUrls = req.files.map((file: any) => file.path);
    const imageUrls = "";
    console.log("Uploaded Image URLs:", imageUrls);
    const product = await productModels_1.default.create({
        name,
        category,
        brand,
        price,
        stock,
        discount,
        ratings,
        description,
        specifications,
        // images: imageUrls,
    });
    res.status(201).json({ msg: "Product created successfully!", product });
});
exports.getAllProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const products = await productModels_1.default.findAll();
    if (!products) {
        return next(new AppError_1.default("No Products yet", 400));
    }
    res
        .status(200)
        .json({ length: products.length, msg: "Products", products });
});
exports.deleteProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModels_1.default.findByPk(id);
    if (!product) {
        return next(new AppError_1.default(`Product with ID ${id} not found`, 404));
    }
    await product.destroy();
    res.status(200).json({ msg: "Product deleted successfully" });
});
exports.updateProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModels_1.default.findByPk(id);
    if (!product) {
        return next(new AppError_1.default(`Product with ID ${id} not found`, 404));
    }
    await product.update(req.body);
    res.status(200).json({ msg: "Product updated successfully", product });
});
exports.getOneProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModels_1.default.findByPk(id);
    if (!product) {
        return next(new AppError_1.default(`Product with ID ${id} not found`, 404));
    }
    res.status(200).json({ msg: "Product found", product });
});
