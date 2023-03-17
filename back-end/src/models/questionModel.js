const mongoose = require("mongoose");
const { userSchema } = require("./userModel");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  answers: [answerSchema],
  askedBy: userSchema,
});

const answerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  answeredBy: userSchema,
  followUp: [questionSchema],
});
module.exports = mongoose.model("Question", questionSchema);
