import { userRegisterSchema, userLoginSchema } from "../helpers/joi_schema";
import { badRequest } from "../middlewares/handle_error";
import { registerUserService, loginUserService } from "../services/authService";

export const registerUser = async (req, res) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) return badRequest(error, res);

    const newUser = await registerUserService(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);

    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { error } = userLoginSchema.validate(req.body);
    if (error) return badRequest(error, res);

    const loginData = await loginUserService(req.body);
    res.status(200).json(loginData);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Internal Server Error",
    });
  }
};
