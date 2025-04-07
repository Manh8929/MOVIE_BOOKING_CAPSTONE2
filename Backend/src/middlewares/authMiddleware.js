const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Role = require("../models/roles");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user.role = await Role.findByPk(req.user.role_id);
    if (!req.user.role) {
      return res.status(401).json({ message: "User has no role." });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token." });
  }
};

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, role_id: user.role_id }, // Lưu role_id trong token để sử dụng sau này
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// Middleware kiểm tra quyền truy cập dựa trên vai trò người dùng
exports.authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Access denied." });
    }

    // Kiểm tra quyền truy cập của người dùng dựa trên role_name
    if (!roles.includes(req.user.role.role_name)) {
      // So sánh với role_name từ bảng Role
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission." });
    }

    next(); // Tiếp tục nếu người dùng có quyền truy cập
  };
};
