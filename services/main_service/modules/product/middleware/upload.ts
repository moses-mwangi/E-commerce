// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../../../shared/config/cloudinary";

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const extension = file.mimetype.split("/")[1];
//     const allowedFormats = ["jpg", "png", "jpeg", "webp"];
//     console.log("cloud_files:", file);

//     if (allowedFormats.includes(extension)) {
//       return {
//         folder: "ecommerce-products",
//         format: extension,
//         public_id: `image_${Date.now()}`,
//         resource_type: "image",
//         transformation: [
//           { width: 500, height: 400, crop: "limit" },
//           { quality: "auto" },
//           { fetch_format: "auto" },
//         ],
//       };
//     } else {
//       throw new Error("Invalid file format");
//     }
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../../shared/config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const extension = file.mimetype.split("/")[1];
    const allowedFormats = ["jpg", "png", "jpeg", "webp"];

    console.log("Received file:", file.originalname); // Debugging

    if (allowedFormats.includes(extension)) {
      return {
        folder: "ecommerce-products",
        format: extension,
        public_id: `image_${Date.now()}`,
        resource_type: "image",
        timeout: 60000, // Increased timeout
        transformation: [{ width: 500, height: 400, crop: "limit" }],
      };
    } else {
      throw new Error("Invalid file format");
    }
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
}).array("images", 10); // Allow up to 10 images

export default upload;
