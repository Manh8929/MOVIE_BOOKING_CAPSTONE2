import Joi from "joi";

export const userRegisterSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).required().messages({
    "string.base": "Full name must be a string",
    "string.min": "Full name must have at least 3 characters",
    "string.max": "Full name can not exceed 255 characters",
    "any.required": "Full name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must have at least 6 characters",
    "any.required": "Password is required",
  }),
  //   phone_number: Joi.string()
  //     .regex(/^\d{10}$/)
  //     .required()
  //     .messages({
  //       //       "string.base": "Phone number must be a string",
  //       "string.pattern.base": "Phone number must be 10 digits",
  //       "any.required": "Phone number is required",
  //     }),
  dob: Joi.date().required().messages({
    "date.base": "Date of birth must be a valid date",
    "any.required": "Date of birth is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": 'Gender must be one of "male", "female", or "other"',
    "any.required": "Gender is required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string",
    "any.required": "Address is required",
  }),
});

// Định nghĩa schema cho đăng nhập người dùng
export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password must be a string",
    "string.min": "Password must have at least 6 characters",
    "any.required": "Password is required",
  }),
});
