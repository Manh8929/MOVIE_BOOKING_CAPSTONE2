import bcrypt from "bcrypt";
import crypto from "crypto";
import { User } from "../models";
import { generateToken } from "../middlewares/authMiddleware";
import { sendResetEmail, sendWelcomeEmail } from "../utils/emailService";
import { Op } from "sequelize";

export const registerUserService = async (userData) => {
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw { message: "Email đã được sử dụng", statusCode: 400 };
  }
  if (userData.password !== userData.confirmPassword) {
    throw { message: "Mật khẩu xác nhận không khớp", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({
    full_name: userData.full_name,
    email: userData.email,
    password: hashedPassword,
    dob: userData.dob,
    gender: userData.gender,
    address: userData.address,
    role_id: 1,
  });
  await sendWelcomeEmail(newUser.email, newUser.full_name);
  return {
    message: "User registered successfully",
    user: newUser,
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
    attributes: [
      "user_id",
      "full_name",
      "email",
      "gender",
      "dob",
      "address",
      "role_id",
      "password",
      "phone_number",
      "avatar",
      "provider",
    ],
  });
  if (!user) {
    throw { message: "Invalid email or password", statusCode: 401 };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { message: "Invalid email or password", statusCode: 401 };
  }

  const token = generateToken(user);
  const { password: _, ...safeUser } = user.toJSON();
  return {
    message: "Login successful",
    user: safeUser,
    token,
  };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw { message: "Email không tồn tại", statusCode: 404 };

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Lưu token + thời gian hết hạn vào DB
  user.reset_password_token = resetTokenHash;
  user.reset_password_expires = Date.now() + 15 * 60 * 1000; // 15 phút
  await user.save();

  await sendResetEmail(email, resetToken);

  return { message: "Reset token đã được gửi đến email của bạn" };
};

export const resetPasswordService = async (
  token,
  newPassword,
  confirmPassword
) => {
  if (newPassword !== confirmPassword)
    throw { message: "Mật khẩu xác nhận không khớp", statusCode: 400 };
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    where: {
      reset_password_token: tokenHash,
      reset_password_expires: { [Op.gt]: Date.now() },
    },
  });
  console.log("uuuuuuuuuuuuu", user);
  if (!user)
    throw { message: "Token không hợp lệ hoặc đã hết hạn", statusCode: 400 };

  user.password = await bcrypt.hash(newPassword, 10);
  user.reset_password_token = null;
  user.reset_password_expires = null;
  await user.save();

  return { message: "Mật khẩu đã được thay đổi thành công" };
};
