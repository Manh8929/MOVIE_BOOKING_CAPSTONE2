const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/users/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
    const safeFilename = `${timestamp}-${basename}${ext}`;
    cb(null, safeFilename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isMimeValid = allowedTypes.test(file.mimetype);
  const isExtValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeValid && isExtValid) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
}).single('avatar');

exports.middlewareUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ message: err.message });
    }

    console.log('Uploaded file:', req.file);
    next();
  });
};

