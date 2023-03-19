const mongoose = require("mongoose");
module.exports.leanUserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  role: {
    type: String,
    required: true,
  },
});
