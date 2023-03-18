const mongoose = require("mongoose");
const { userSchema } = require("./userModel");

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  professor: userSchema,
  students: [userSchema],
  deletedAt: Number,
});

module.exports = mongoose.model("ClassRoom", classRoomSchema);
