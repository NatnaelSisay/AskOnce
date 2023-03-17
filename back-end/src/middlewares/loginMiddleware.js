const { body, validationResult, check } = require("express-validator");
const ResponseError = require("../errors/ResponseError");
const { compareHash } = require("../hashPassword");
const { getUserByEmail } = require("../respository/userRepository");

module.exports.logginMiddleware = async (req, _, next) => {
  let user;
  const validations = [
    body("email").isEmail(),
    check("email").custom(async (value, { req }) => {
      user = await getUserByEmail(value, true);
      if (!user) {
        return Promise.reject("User not registered with this email");
      }
      user = user.toObject();
      const password = req.body.password;
      const result = await compareHash(password, user.password);
      if (!result) return Promise.reject("Wrong password");
    }),
  ];
  for (let validation of validations) {
    await validation.run(req);
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    let { password, ...rest } = user;
    req.validatedUser = rest;
    return next();
  }
  next(new ResponseError(400, errors));
};
