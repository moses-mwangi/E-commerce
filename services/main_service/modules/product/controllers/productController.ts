import { NextFunction, Request, Response } from "express";
import Product from "../models/productModels";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import cloudinary from "../../../shared/config/cloudinary";

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      category,
      price,
      stock,
      description,
      discount,
      ratings,
      brand,
      specifications,
    } = req.body;

    if (!name || !category || !price || !stock || !description) {
      return next(new AppError("All fields are required", 400));
    }

    let imageUrls: string[] = [];

    const files = req.files as Express.Multer.File[];
    if (req.files && Array.isArray(req.files)) {
      const uploadWithRetry = async (
        file: Express.Multer.File,
        retries = 4
      ) => {
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

              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: "ecommerce-product",
                  public_id: `image_${Date.now()}`,
                  resource_type: "image",
                  timeout: 60000,
                },
                (error, result) => {
                  if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    resolve(null);
                  } else {
                    resolve(result?.secure_url);
                  }
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result) return result;
          } catch (error) {
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
        .map((result) => (result as PromiseFulfilledResult<string>).value);
    }
    console.log(imageUrls);
    if (imageUrls.length < 4) {
      console.log("The image should bemore than 4");
      return next(new AppError("", 400));
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

    const product = await Product.create(data);
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
    const {
      name,
      category,
      price,
      stock,
      description,
      discount,
      ratings,
      brand,
      specifications,
    } = req.body;

    // Find product first
    const product = await Product.findByPk(id);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Handle image uploads if there are new images
    let newImageUrls: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      const uploadWithRetry = async (
        file: Express.Multer.File,
        retries = 4
      ) => {
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

              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: "ecommerce-product",
                  public_id: `image_${Date.now()}`,
                  resource_type: "image",
                  timeout: 60000,
                },
                (error, result) => {
                  if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    resolve(null);
                  } else {
                    resolve(result?.secure_url);
                  }
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result) return result;
          } catch (error) {
            console.error(`Upload attempt ${i + 1} failed:`, error);
          }
        }
        return null;
      };

      const uploadPromises = req.files.map((file) => uploadWithRetry(file));
      const results = await Promise.allSettled(uploadPromises);

      newImageUrls = results
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => (result as PromiseFulfilledResult<string>).value);
    }

    // Combine existing and new images
    let updatedImages = [...(req.body.existingImages || [])];
    if (newImageUrls.length > 0) {
      updatedImages = [...updatedImages, ...newImageUrls];
    }

    // Ensure minimum image requirement is met
    if (updatedImages.length < 4) {
      return next(new AppError("Minimum 4 product images required", 400));
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
      if (
        key in updatedData &&
        updatedData[key as keyof typeof updatedData] === undefined
      ) {
        delete updatedData[key as keyof typeof updatedData];
      }
    });

    // Update the product
    const updatedProduct = await product.update(updatedData);

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product: updatedProduct,
    });
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
