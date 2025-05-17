const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Thư mục lưu ảnh
const uploadDir = "uploads/admin/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình storage với multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Tạo tên file an toàn: timestamp + tên gốc chuẩn hóa
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase();
    cb(null, `${timestamp}-${basename}${ext}`);
  },
});

// Lọc file chỉ cho phép hình ảnh
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isMimeValid = allowedTypes.test(file.mimetype);
  const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ cho phép file ảnh (jpeg, jpg, png, gif)!"));
  }
};

// Tạo middleware upload cho 1 file "thumbnail"
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
  fileFilter,
}).single("thumbnail");

// Middleware xử lý upload
exports.middleuploadThumbnail = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Lỗi upload ảnh:", err);
      return res.status(400).json({ message: err.message });
    }
    // Nếu upload thành công, file info sẽ có trong req.file
    next();
  });
};
