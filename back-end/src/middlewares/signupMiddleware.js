const { body, validationResult, check } = require("express-validator");
const { ROLES_ENUM } = require("../constants");
const ResponseError = require("../errors/ResponseError");
const { getUserByEmail } = require("../respository/userRepository");

const nameRegex = /^[a-zA-Z ]{2,30}$/;

module.exports.signupMiddleware = async (req, _, next) => {
  const validations = [
    check("role")
      .exists()
      .isString()
      .custom((value, { _ }) => {
        const role = value?.toUpperCase();
        if (role === ROLES_ENUM.professor || role === ROLES_ENUM.student) {
          req.body.role = role;
          return true;
        }
        throw new Error("Invalid role provided");
      }),
    check("firstName")
      .exists()
      .custom((value, { _ }) => {
        if (nameRegex.test(value)) {
          return true;
        }
        throw new Error("Invalid first name provided");
      }),
    check("lastName")
      .exists()
      .custom((value, { _ }) => {
        if (nameRegex.test(value)) {
          return true;
        }
        throw new Error("Invalid last name provided");
      }),

    check("email")
      .isEmail()
      .custom((value) => {
        return getUserByEmail(value).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      }),
    body("password").isLength({ min: 8 }),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ];
  for (let validation of validations) {
    await validation.run(req);
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  next(new ResponseError(400, errors));
};
