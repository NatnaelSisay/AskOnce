const mongoose = require("mongoose");
module.exports.leanUserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    sparse: true,
  },
  lastName: {
    type: String,
    required: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    sparse: true,
  },

  role: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
});
