"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProduct = exports.updateProduct = exports.deleteProduct = exports.getAllProduct = exports.createProduct = void 0;
const productModels_1 = __importDefault(require("../models/productModels"));
const catchSync_1 = __importDefault(require("../../../shared/utils/catchSync"));
const AppError_1 = __importDefault(require("../../../shared/utils/AppError"));
const cloudinary_1 = __importDefault(require("../../../shared/config/cloudinary"));
exports.createProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { name, category, price, stock, description, discount, ratings, brand, specifications, } = req.body;
    if (!name || !category || !price || !stock || !description) {
        return next(new AppError_1.default("All fields are required", 400));
    }
    let imageUrls = [];
    const files = req.files;
    if (req.files && Array.isArray(req.files)) {
        const uploadWithRetry = async (file, retries = 4) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const result = await new Promise((resolve) => {
                        if (!file.buffer) {
                            console.error("File buffer is missing:", file.originalname);
                            return resolve(null);
                        }
                        const allowedFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                        ];
                        if (!allowedFormats.includes(file.mimetype)) {
                            console.error("Unsupported file format:", file.mimetype);
                            return resolve(null);
                        }
                        const uniqueId = `${Date.now()}_${Math.random()
                            .toString(36)
                            .substring(7)}`; // Ensure unique filename
                        const uploadStream = cloudinary_1.default.uploader.upload_stream({
                            folder: "ecommerce-product",
                            public_id: `image_${Date.now()}`,
                            resource_type: "image",
                            timeout: 60000,
                        }, (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                resolve(null);
                            }
                            else {
                                resolve(result?.secure_url);
                            }
                        });
                        uploadStream.end(file.buffer);
                    });
                    if (result)
                        return result;
                }
                catch (error) {
                    console.error(`Upload attempt ${i + 1} failed:`, error);
                }
            }
            return null;
        };
        const uploadPromises = files.map((file) => uploadWithRetry(file));
        const results = await Promise.allSettled(uploadPromises);
        console.log("Upload Results:", results);
        imageUrls = results
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value);
    }
    console.log(imageUrls);
    if (imageUrls.length < 4) {
        console.log("The image should bemore than 4");
        return next(new AppError_1.default("", 400));
    }
    const specificationsArray = JSON.parse(specifications);
    const data = {
        name,
        category,
        brand,
        price,
        stock,
        discount,
        ratings,
        description,
        specifications: specificationsArray,
        images: imageUrls,
    };
    console.log(data);
    const product = await productModels_1.default.create(data);
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
    const { name, category, price, stock, description, discount, ratings, brand, specifications, } = req.body;
    // Find product first
    const product = await productModels_1.default.findByPk(id);
    if (!product) {
        return next(new AppError_1.default("Product not found", 404));
    }
    // Handle image uploads if there are new images
    let newImageUrls = [];
    if (req.files && Array.isArray(req.files)) {
        const uploadWithRetry = async (file, retries = 4) => {
            for (let i = 0; i < retries; i++) {
                try {
                    const result = await new Promise((resolve) => {
                        if (!file.buffer) {
                            console.error("File buffer is missing:", file.originalname);
                            return resolve(null);
                        }
                        const allowedFormats = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/webp",
                        ];
                        if (!allowedFormats.includes(file.mimetype)) {
                            console.error("Unsupported file format:", file.mimetype);
                            return resolve(null);
                        }
                        const uploadStream = cloudinary_1.default.uploader.upload_stream({
                            folder: "ecommerce-product",
                            public_id: `image_${Date.now()}`,
                            resource_type: "image",
                            timeout: 60000,
                        }, (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                resolve(null);
                            }
                            else {
                                resolve(result?.secure_url);
                            }
                        });
                        uploadStream.end(file.buffer);
                    });
                    if (result)
                        return result;
                }
                catch (error) {
                    console.error(`Upload attempt ${i + 1} failed:`, error);
                }
            }
            return null;
        };
        const uploadPromises = req.files.map((file) => uploadWithRetry(file));
        const results = await Promise.allSettled(uploadPromises);
        newImageUrls = results
            .filter((result) => result.status === "fulfilled" && result.value)
            .map((result) => result.value);
    }
    // Combine existing and new images
    let updatedImages = [...(req.body.existingImages || [])];
    if (newImageUrls.length > 0) {
        updatedImages = [...updatedImages, ...newImageUrls];
    }
    // Ensure minimum image requirement is met
    if (updatedImages.length < 4) {
        return next(new AppError_1.default("Minimum 4 product images required", 400));
    }
    // Parse specifications if provided as string
    let updatedSpecifications = specifications;
    if (typeof specifications === "string") {
        updatedSpecifications = JSON.parse(specifications);
    }
    // Update product data
    const updatedData = {
        name,
        category,
        brand,
        price,
        stock,
        discount,
        ratings,
        description,
        specifications: updatedSpecifications,
        images: updatedImages,
    };
    // Remove undefined values
    Object.keys(updatedData).forEach((key) => {
        if (key in updatedData &&
            updatedData[key] === undefined) {
            delete updatedData[key];
        }
    });
    // Update the product
    const updatedProduct = await product.update(updatedData);
    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        product: updatedProduct,
    });
});
exports.getOneProduct = (0, catchSync_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModels_1.default.findByPk(id);
    if (!product) {
        return next(new AppError_1.default(`Product with ID ${id} not found`, 404));
    }
    res.status(200).json({ msg: "Product found", product });
});
