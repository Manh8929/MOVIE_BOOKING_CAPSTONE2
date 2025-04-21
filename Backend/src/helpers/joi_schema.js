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
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
    "any.required": "Confirm password is required",
  }),
    phone_number: Joi.string()
      .regex(/^\d{10}$/)
      .required()
      .messages({
        //       "string.base": "Phone number must be a string",
        "string.pattern.base": "Phone number must be 10 digits",
        "any.required": "Phone number is required",
      }),
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


export const updateUserProfileSchema = Joi.object({
  full_name: Joi.string().min(3).max(255).messages({
    "string.base": "Full name must be a string",
    "string.min": "Full name must have at least 3 characters",
    "string.max": "Full name can not exceed 255 characters",
  }),
  phone_number: Joi.string()
    .pattern(/^\d{10}$/)
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
    }),
  dob: Joi.date().iso().less('now').messages({
    "date.base": "Date of birth must be a valid date",
    "date.less": "Date of birth must be in the past",
  }),
  gender: Joi.string().valid("male", "female", "other").messages({
    "any.only": 'Gender must be one of "male", "female", or "other"',
  }),
  address: Joi.string().max(255).messages({
    "string.base": "Address must be a string",
    "string.max": "Address must not exceed 255 characters",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "Avatar must be a valid URL",
  }),
});
