const mongoose = require("mongoose");
const { leanUserSchema } = require("./leanUserSchema");

const answerSchema = new mongoose.Schema({
  user: leanUserSchema,

  answer: {
    type: String,
    required: true,
  },
  deletedAt: Date,
});
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
  },
  answers: [answerSchema],
  askedBy: {
    type: leanUserSchema,
    required: false,
  },
  classroomId: String,
  deletedAt: Date,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true }],
});
questionSchema.index({ question: "text" });

module.exports = mongoose.model("Question", questionSchema);
