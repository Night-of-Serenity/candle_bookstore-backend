const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});

const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
});

module.exports.validateRegister = (input) => {
  const { value, error } = registerSchema.validate(input);
  if (error) {
    throw error;
  }
  return value;
};

module.exports.validateLogin = (input) => {
  const { value, error } = loginSchema.validate(input);
  if (error) {
    throw error;
  }
  return value;
};
