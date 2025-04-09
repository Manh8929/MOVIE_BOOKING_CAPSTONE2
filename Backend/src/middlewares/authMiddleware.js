const jwt = require("jsonwebtoken");
const db = require("../models");

exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.user_id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    const role = await db.Role.findByPk(user.role_id);
    if (!role) {
      return res.status(401).json({ message: "User has no role." });
    }

    req.user = user;
    req.user.role = role;

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Invalid token." });
  }
};

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.user_id, role_id: user.role_id }, // Lưu role_id trong token để sử dụng sau này
    { user_id: user.user_id, role_id: user.role_id },
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

    if (!roles.includes(req.user.role.role_name)) {
      return res
        .status(403)
        .json({ message: "Access denied. You do not have permission." });
    }

    next();
  };
};
