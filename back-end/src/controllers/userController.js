const {
  createUser,
  searchUserByFirstNameOrEmail,
} = require("../respository/userRepository");
const { hashPassword } = require("../hashPassword");
const { signJwt } = require("../jwtUtil");
module.exports.loginController = async (req, res, next) => {
  try {
    const user = req.validatedUser;
    const token = signJwt({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      _id: user._id,
      profileImage: user.profileImage,
    });
    res.statusCode = 200;
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

module.exports.signupController = async (req, res, next) => {
  try {
    const newUser = { ...req.body, profileImage: req.file?.filename };
    console.log(newUser);
    const passHash = await hashPassword(newUser.password);
    newUser.password = passHash;
    const result = await createUser(newUser);
    const token = signJwt({
      email: result.email,
      role: result.role,
      firstName: result.firstName,
      lastName: result.lastName,
      _id: result._id,
      profileImage: result.profileImage,
    });
    res.statusCode = 201;
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
module.exports.searchUser = async (req, res, next) => {
  try {
    const { search } = req.query;
    const result = await searchUserByFirstNameOrEmail(search);
    res.statusCode = 200;
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.profileImage = async (req, res, next) => {
  try {
    res.sendFile(req.params.filename, { root: "uploads" });
  } catch (error) {
    next(error);
  }
};
