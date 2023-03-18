const mongoose = require("mongoose");
const { connectDb } = require("../dbConnect");
const { userSchema } = require("./userModel");
connectDb();

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  professor: {
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
  },
  students: [
    {
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
    },
  ],
});

module.exports = mongoose.model("ClassRoom", classRoomSchema);
