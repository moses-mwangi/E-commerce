import { NextFunction, Request, Response } from "express";
import Product from "../models/product/productModels";
import catchAsync from "../../../shared/utils/catchSync";
import AppError from "../../../shared/utils/AppError";
import cloudinary from "../../../shared/config/cloudinary";
import ProductImage from "../models/product/productImageModel";
import sequelize from "../../../shared/config/pg_database";
import { Op } from "sequelize";

// export const createProduct = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const {
//       name,
//       category,
//       price,
//       stock,
//       description,
//       discount,
//       ratings,
//       brand,
//       specifications,
//     } = req.body;

//     if (!name || !category || !price || !stock || !description) {
//       return next(new AppError("All fields are required", 400));
//     }

//     let imageUrls: string[] = [];

//     const files = req.files as Express.Multer.File[];
//     if (req.files && Array.isArray(req.files)) {
//       const uploadWithRetry = async (
//         file: Express.Multer.File,
//         retries = 4
//       ) => {
//         for (let i = 0; i < retries; i++) {
//           try {
//             const result = await new Promise((resolve) => {
//               if (!file.buffer) {
//                 console.error("File buffer is missing:", file.originalname);
//                 return resolve(null);
//               }

//               const allowedFormats = [
//                 "image/jpeg",
//                 "image/jpg",
//                 "image/png",
//                 "image/webp",
//               ];

//               if (!allowedFormats.includes(file.mimetype)) {
//                 console.error("Unsupported file format:", file.mimetype);
//                 return resolve(null);
//               }
//               const uniqueId = `image_${Date.now()}_${Math.random()
//                 .toString(36)
//                 .substring(7)}`; // Ensure unique filename

//               const uploadStream = cloudinary.uploader.upload_stream(
//                 {
//                   folder: "ecommerce-product",
//                   // public_id: `image_${Date.now()}`,
//                   public_id: uniqueId,
//                   resource_type: "image",
//                   timeout: 60000,
//                 },
//                 (error, result) => {
//                   if (error) {
//                     console.error("Cloudinary Upload Error:", error);
//                     resolve(null);
//                   } else {
//                     resolve(result?.secure_url);
//                   }
//                 }
//               );
//               uploadStream.end(file.buffer);
//             });

//             if (result) return result;
//           } catch (error) {
//             console.error(`Upload attempt ${i + 1} failed:`, error);
//           }
//         }
//         return null;
//       };

//       const uploadPromises = files.map((file) => uploadWithRetry(file));
//       const results = await Promise.allSettled(uploadPromises);

//       console.log("Upload Results:", results);

//       imageUrls = results
//         .filter((result) => result.status === "fulfilled" && result.value)
//         .map((result) => (result as PromiseFulfilledResult<string>).value);
//     }
//     console.log(imageUrls);
//     if (imageUrls.length < 4) {
//       console.log("The image should bemore than 4");
//       return next(new AppError("", 400));
//     }

//     const specificationsArray = JSON.parse(specifications);
//     const data = {
//       name,
//       category,
//       brand,
//       price,
//       stock,
//       discount,
//       ratings,
//       description,
//       specifications: specificationsArray,
//       // images: imageUrls,
//     };

//     console.log(data);

//     const product = await Product.create(data);

//     if (imageUrls.length >= 4) {
//       imageUrls.map((image, idx) => {
//         const images = { url: image, isMain: idx === 0, productId: product.id };
//         await ProductImage.create(images);
//       });
//     }
//     res.status(201).json({ msg: "Product created successfully!", product });
//   }
// );

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

    // Validate required fields
    if (!name || !category || !price || !stock || !description) {
      return next(new AppError("All fields are required", 400));
    }

    // Validate specifications
    let specificationsArray: { key: string; value: string }[] = [];
    try {
      specificationsArray = JSON.parse(specifications);
      if (!Array.isArray(specificationsArray)) {
        return next(new AppError("Specifications must be an array", 400));
      }
    } catch (error) {
      return next(new AppError("Invalid specifications format", 400));
    }

    // Validate and upload images
    const files = req.files as Express.Multer.File[];
    if (!files || files.length < 4) {
      return next(new AppError("At least 4 images are required", 400));
    }

    const uploadWithRetry = async (
      file: Express.Multer.File,
      retries = 4
    ): Promise<string | null> => {
      for (let i = 0; i < retries; i++) {
        try {
          const result = await new Promise<string | null>((resolve) => {
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

            const uniqueId = `image_${Date.now()}_${Math.random()
              .toString(36)
              .substring(7)}`; // Ensure unique filename

            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "ecommerce-product",
                public_id: uniqueId,
                resource_type: "image",
                timeout: 60000,
              },
              (error, result) => {
                if (error) {
                  console.error("Cloudinary Upload Error:", error);
                  resolve(null);
                } else {
                  resolve(result?.secure_url || null);
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

    const imageUrls = results
      .filter((result) => result.status === "fulfilled" && result.value)
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    if (imageUrls.length < 4) {
      return next(new AppError("At least 4 images must be uploaded", 400));
    }

    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Create the product
      const product = await Product.create(
        {
          name,
          category,
          brand,
          price,
          stock,
          discount,
          ratings,
          description,
          specifications: specificationsArray,
        },
        { transaction }
      );

      // Create product images
      await Promise.all(
        imageUrls.map((image, idx) =>
          ProductImage.create(
            {
              url: image,
              isMain: idx === 0,
              productId: product.id,
            },
            { transaction }
          )
        )
      );

      // Commit the transaction
      await transaction.commit();

      res.status(201).json({ msg: "Product created successfully!", product });
    } catch (error) {
      // Rollback the transaction in case of error
      await transaction.rollback();
      console.error("Error creating product:", error);
      return next(new AppError("Failed to create product", 500));
    }
  }
);

export const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await Product.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: ProductImage,
        as: "productImages",
        attributes: ["id", "url", "isMain", "productId"],
      },
    });

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
    await ProductImage.destroy({ where: { productId: product.id } });
    await product.destroy();

    res.status(200).json({ msg: "Product deleted successfully" });
  }
);

///////////////////////////////////////////////////////////////////////
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
      deletedImages,
      existingImages,
    } = req.body;
    if (!name || !category || !price || !stock || !description) {
      return next(new AppError("All fields are required", 400));
    }

    // Validate specifications
    let specificationsArray: { key: string; value: string }[] = [];

    try {
      specificationsArray = JSON.parse(specifications);
      if (!Array.isArray(specificationsArray)) {
        return next(new AppError("Specifications must be an array", 400));
      }
    } catch (error) {
      return next(new AppError("Invalid specifications format", 400));
    }

    let parsedDeletedImages: number[] = [];
    let parsedExistingImages: any[] = [];

    try {
      parsedDeletedImages = JSON.parse(deletedImages);
      parsedExistingImages = JSON.parse(existingImages);

      if (
        !Array.isArray(parsedDeletedImages) ||
        !Array.isArray(parsedExistingImages)
      ) {
        return next(new AppError("Invalid images data format", 400));
      }
    } catch (error) {
      return next(new AppError("Failed to parse images data", 400));
    }

    const product = await Product.findOne({
      include: {
        model: ProductImage,
        as: "productImages",
        attributes: ["id", "url", "isMain", "productId"],
      },
      where: {
        id: id,
      },
    });

    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // Handle new image uploads
    // const files = req.files as Express.Multer.File[];
    // let newImageUrls: string[] = [];

    // if (files && files.length > 0) {
    //   try {
    //     const uploadPromises = files.map((file) => {
    //       return new Promise<string>(async (resolve, reject) => {
    //         if (!file.buffer) {
    //           return reject(new Error("File buffer is missing"));
    //         }

    //         const allowedFormats = [
    //           "image/jpeg",
    //           "image/jpg",
    //           "image/png",
    //           "image/webp",
    //         ];
    //         if (!allowedFormats.includes(file.mimetype)) {
    //           return reject(new Error("Unsupported file format"));
    //         }

    //         const uniqueId = `image_${Date.now()}_${Math.random()
    //           .toString(36)
    //           .substring(7)}`;

    //         cloudinary.uploader
    //           .upload_stream(
    //             {
    //               folder: "ecommerce-product",
    //               public_id: uniqueId,
    //               resource_type: "image",
    //               timeout: 60000,
    //             },
    //             (error, result) => {
    //               if (error) {
    //                 console.error("Cloudinary upload error:", error);
    //                 reject(error);
    //               } else {
    //                 resolve(result?.secure_url || "");
    //               }
    //             }
    //           )
    //           .end(file.buffer);
    //       });
    //     });

    //     newImageUrls = (await Promise.allSettled(uploadPromises))
    //       .filter((result) => result.status === "fulfilled" && result.value)
    //       .map((result) => (result as PromiseFulfilledResult<string>).value);

    //     if (newImageUrls.length !== files.length) {
    //       console.error("Some images failed to upload");
    //     }
    //   } catch (uploadError) {
    //     console.error("Image upload failed:", uploadError);
    //     return next(new AppError("Failed to upload images", 500));
    //   }
    //   // }
    // }

    const files = req.files as Express.Multer.File[];
    let newImageUrls: string[] = [];

    if (files && files.length > 0) {
      const uploadWithRetry = async (
        file: Express.Multer.File,
        retries = 4
      ): Promise<string | null> => {
        for (let i = 0; i < retries; i++) {
          try {
            const result = await new Promise<string | null>((resolve) => {
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

              const uniqueId = `image_${Date.now()}_${Math.random()
                .toString(36)
                .substring(7)}`; // Ensure unique filename

              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: "ecommerce-product",
                  public_id: uniqueId,
                  resource_type: "image",
                  timeout: 60000,
                },
                (error, result) => {
                  if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    resolve(null);
                  } else {
                    resolve(result?.secure_url || null);
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

      newImageUrls = results
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => (result as PromiseFulfilledResult<string>).value);
    }
    let committed = false;
    const transaction = await sequelize.transaction();

    try {
      await product.update(
        {
          name,
          category,
          brand,
          price,
          stock,
          discount: discount === "" ? null : discount,
          ratings,
          description,
          specifications: specificationsArray,
        },
        { transaction }
      );

      // const parseImageToDelete = JSON.parse(deletedImages);
      // const existImage = JSON.parse(existingImages);
      const filterdImage = parsedExistingImages.filter(
        (obj: any) => !parsedDeletedImages.includes(obj.id)
      );

      if (
        filterdImage &&
        // Array.isArray(filterdImage) &&
        filterdImage.length > 0
      ) {
        const hasMainImage = filterdImage.some(
          (image) => image.isMain === true
        );

        await Promise.all(
          filterdImage.map((image, idx) =>
            ProductImage.update(
              {
                url: image.url,
                isMain: !hasMainImage && idx === 0 ? true : image.isMain,
                productId: image.productId,
              },
              { where: { id: image.id }, transaction }
            )
          )
        );
      }

      if (
        parsedDeletedImages &&
        // Array.isArray(parsedDeletedImages) &&
        parsedDeletedImages.length > 0
      ) {
        await ProductImage.destroy({
          where: { id: parsedDeletedImages, productId: Number(id) },
          transaction,
        });
      }

      // Add new images
      if (newImageUrls.length > 0) {
        const currentImages = await ProductImage.count({
          where: { productId: id },
          transaction,
        });

        await Promise.all(
          newImageUrls.map((image, idx) =>
            ProductImage.create(
              {
                url: image,
                isMain: currentImages === 0 && idx === 0,
                productId: product.id,
              },
              { transaction }
            )
          )
        );
      }

      await transaction.commit();
      committed = true;

      const updatedProduct = await Product.findByPk(product.id, {
        include: [
          {
            model: ProductImage,
            as: "productImages",
            attributes: ["id", "url", "isMain", "productId"],
          },
        ], // Match the alias in model association
      });

      res
        .status(200)
        .json({ msg: "Product updated successfully!", updatedProduct });
    } catch (error) {
      if (!committed) {
        await transaction.rollback();
      }
      console.error("Error updating product:", error);
      return next(new AppError("Failed to update product", 500));
    }
  }
);

//   try {
//     const uploadPromises = files.map((file) => {
//       return new Promise<string>(async (resolve, reject) => {
//         if (!file.buffer) {
//           return reject(new Error("File buffer is missing"));
//         }

//         const allowedFormats = [
//           "image/jpeg",
//           "image/jpg",
//           "image/png",
//           "image/webp",
//         ];
//         if (!allowedFormats.includes(file.mimetype)) {
//           return reject(new Error("Unsupported file format"));
//         }

//         const uniqueId = `image_${Date.now()}_${Math.random()
//           .toString(36)
//           .substring(7)}`;

//         cloudinary.uploader
//           .upload_stream(
//             {
//               folder: "ecommerce-product",
//               public_id: uniqueId,
//               resource_type: "image",
//               timeout: 60000,
//             },
//             (error, result) => {
//               if (error) {
//                 console.error("Cloudinary upload error:", error);
//                 reject(error);
//               } else {
//                 resolve(result?.secure_url || "");
//               }
//             }
//           )
//           .end(file.buffer);
//       });
//     });

//     newImageUrls = (await Promise.allSettled(uploadPromises))
//       .filter((result) => result.status === "fulfilled" && result.value)
//       .map((result) => (result as PromiseFulfilledResult<string>).value);

//     if (newImageUrls.length !== files.length) {
//       console.error("Some images failed to upload");
//     }
//   } catch (uploadError) {
//     console.error("Image upload failed:", uploadError);
//     return next(new AppError("Failed to upload images", 500));
//   }
// }

export const getOneProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await Product.findOne({
      include: {
        model: ProductImage,
        as: "productImages",
        attributes: ["id", "url", "isMain", "productId"],
      },
      where: {
        id: id,
      },
    });

    if (!product) {
      return next(new AppError(`Product with ID ${id} not found`, 404));
    }

    res.status(200).json({ msg: "Product found", product });
  }
);
