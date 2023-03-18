const mongoose = require("mongoose");
const { leanUserSchema } = require("./leanUserSchema");

const answerSchema = new mongoose.Schema({
  user: {
    leanUserSchema
  },
  answer: {
    type: String,
    required: true,
  }

});
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }]
  ,
  description: {
    type: String,
  },
   answers: [answerSchema],
  askedBy: {
    type:leanUserSchema,
    required: true},
  classroomId: String
});
// const answerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   answeredBy: userSchema,
//   followUp: [questionSchema],
// });



module.exports = mongoose.model("Question", questionSchema);
