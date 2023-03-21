const mongoose = require("mongoose");
const { leanUserSchema } = require("./leanUserSchema");

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  professor: leanUserSchema,
  students: [leanUserSchema],
  deletedAt: Number,
});

module.exports = mongoose.model("ClassRoom", classRoomSchema);
