var jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
module.exports.signJwt = (payload) => jwt.sign(payload, secret);
