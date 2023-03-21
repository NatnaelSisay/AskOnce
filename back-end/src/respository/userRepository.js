const { model } = require("mongoose");
const { userModel } = require("../models/userModel");

module.exports.createUser = async (data) => {
  const newUser = new userModel({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    role: data.role,
    profileImage: data.profileImage,
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

module.exports.searchUserByFirstNameOrEmail = async (searchTerm) => {
  const result = await userModel.find({
    $or: [
      { firstName: { $regex: `^${searchTerm}`, $options: "i" } },
      { email: { $regex: `^${searchTerm}`, $options: "i" } },
    ],
  });
  return result;
};
