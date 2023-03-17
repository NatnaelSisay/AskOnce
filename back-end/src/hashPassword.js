const bcrypt = require("bcrypt");
require("dotenv").config();
const saltRounds = Number.parseInt(process.env.SALT_ROUNDS);

module.exports.hashPassword = async (password) =>
  bcrypt.hash(password, saltRounds);
module.exports.compareHash = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);
