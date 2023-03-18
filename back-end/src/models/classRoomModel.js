const mongoose = require("mongoose");

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
        unique: true,
        sparse: true,
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
        sparse: true,
      },

      role: {
        type: String,
        required: true,
      },
    },
  ],
  deletedAt: Number,
});

module.exports = mongoose.model("ClassRoom", classRoomSchema);
