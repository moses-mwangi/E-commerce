import { NextFunction, Request, Response } from "express";
import Product from "../models/productModels";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";

// export const createProduct = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { name, category, price, stock, description } = req.body;
//     console.log("files:", req.files);
//     if (!req.files || !Array.isArray(req.files)) {
//       return next(new AppError("No files uploaded", 400));
//     }

//     const imageUrl = req.files.map((el) => el.path);
//     console.log("filesImageUrl2ss:", imageUrl);

//     if (!name || !category || !price || !stock || !description) {
//       return next(new AppError("Missing field is required", 400));
//     }

//     if (!req.file) {
//       return next(new AppError("Image is required!", 400));
//     }

//     const product = await Product.create({
//       name,
//       category,
//       price,
//       stock,
//       description,
//       images: [imageUrl],
//     });

//     res.status(201).json({ msg: "success", product });
//   }
// );

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, category, price, stock, description } = req.body;

    console.log("Received request data:", req.body); // Debugging
    console.log("Received files:", req.files); // Debugging

    // Check if images are uploaded
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next(new AppError("No files uploaded", 400));
    }

    // Get image URLs from Cloudinary
    const imageUrls = req.files.map((file: any) => file.path);
    // const imageUrls = req.body.images;
    console.log("Uploaded Image URLs:", imageUrls);

    // Validate other required fields
    if (!name || !category || !price || !stock || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const product = await Product.create({
      name,
      category,
      price,
      stock,
      description,
      images: imageUrls,
    });

    res.status(201).json({ msg: "Product created successfully!", product });
  }
);

export const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.findAll();

    if (!products) {
      return next(new AppError("No Products yet", 400));
    }

    res
      .status(200)
      .json({ length: products.length, msg: "Products", products });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    await product.destroy();

    res.status(200).json({ msg: "Product deleted successfully" });
  }
);

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    await product.update(req.body);

    res.status(200).json({ msg: "Product updated successfully", product });
  }
);

export const getOneProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    res.status(200).json({ msg: "Product found", product });
  }
);
