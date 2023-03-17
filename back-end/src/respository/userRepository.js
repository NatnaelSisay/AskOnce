const { userModel } = require("../models/userModel");

module.exports.createUser = async (data) => {
  const password = "hashedPassword";
  const newUser = new userModel({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: password,
    role: data.role,
  });
  const result = await newUser.save();
  return result.toObject();
};

module.exports.findUserById = async (id) => {
  const result = await userModel.findById(id);
  return result;
};
module.exports.getUserByEmail = async (email, includePassword = false) => {
  const result = await userModel
    .findOne({ email: email })
    .select([includePassword ? "+password" : "-password"]);
  return result;
};
