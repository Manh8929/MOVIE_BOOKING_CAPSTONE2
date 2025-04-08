import bcrypt from "bcrypt";
import { User } from "../models";
import { generateToken } from "../middlewares/authMiddleware";

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
