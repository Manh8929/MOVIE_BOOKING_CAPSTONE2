import bcrypt from "bcrypt";
import { User } from "../models";
import { generateToken } from "../middlewares/authMiddleware";

export const registerUserService = async (userData) => {
  console.log("user data", userData);
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw { message: "Email is already registered", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await User.create({
    full_name: userData.full_name,
    email: userData.email,
    password: hashedPassword,
    dob: userData.dob,
    gender: userData.gender,
    address: userData.address,
    role_id: 2,
  });

  return {
    message: "User registered successfully",
    user: newUser,
  };
};

export const loginUserService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw { message: "Invalid email or password", statusCode: 401 };
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { message: "Invalid email or password", statusCode: 401 };
  }

  const token = generateToken(user);

  return {
    message: "Login successful",
    user,
    token,
  };
};
