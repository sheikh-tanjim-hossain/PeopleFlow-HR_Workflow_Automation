const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiResponse = require("../utils/apiResponse");

const uploadDirectory = path.join("uploads", "profiles");

// Ensure upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

/**
 * Middleware to handle image upload safely for both 'img' and 'profilePicture' fields.
 * Validates errors and attaches the uploaded file to req.file.
 */
const handleImageUpload = (req, res, next) => {
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json(new ApiResponse(400, err.message || "File upload error", null, err.message));
    } else if (err) {
      return res
        .status(400)
        .json(new ApiResponse(400, err.message || "File validation error", null, err.message));
    }

    if (req.files) {
      if (req.files.img && req.files.img.length > 0) {
        req.file = req.files.img[0];
      } else if (req.files.profilePicture && req.files.profilePicture.length > 0) {
        req.file = req.files.profilePicture[0];
      }
    }
    next();
  });
};

upload.handleImageUpload = handleImageUpload;

module.exports = upload;
