const { createUser } = require("../respository/userRepository");
const { hashPassword } = require("../hashPassword");
const { signJwt } = require("../jwtUtil");


module.exports.signupController = async (req, res, next) => {
  try {
    const newUser = req.body;
    const passHash = await hashPassword(newUser.password);
    newUser.password = passHash;
    const result = await createUser(newUser);
    const token = signJwt({
      email: result.email,
      firstName: result.firstName,
      lastName: result.lastName,
      _id: result._id,
    });
    res.statusCode = 201;
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
