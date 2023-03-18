const questionsModel = require("../models/questionModel");

module.exports.findAllQuestions = async (classroomId) => {
  const result = await questionsModel.find({ classroomId,
    deletedAt: { $exists: false } });
  return result;
};
module.exports.findQuestionsByTags = async (classroomId,tag) => {
  const result = await questionsModel.find({
    classroomId,
    deletedAt: { $exists: false },
    tags: { $in: [tag] },
  });
  
  return result;
};
module.exports.createQuestion = async (classroomId,data) => {
  const newQuestion = new questionsModel({
    question: data.question,
    tags: data.tags,
    description: data?.description,
    // classroomId:classroomId,
    answers: [],
    askedBy: data.askedBy,
    classroomId:classroomId,
  });
  
  const result = await newQuestion.save();

  return result.toObject();
};
module.exports.findAquestionsByTitle = async (classroomId,title) => {
  const result = await questionsModel.find({
    classroomId,
    deletedAt: { $exists: false },
    $text: { $search: title },
  });
  
  return result;
};
module.exports.deleteAquestion = async (classroomId,id) => {
  // const result= await questionsModel.findByIdAndDelete(id);
  const result = await questionsModel.updateOne(
    { _id: id ,
    classroomId},
    { $set: { deletedAt: Date.now() } }
  );
  return result;
};
module.exports.findAllAnswers = async (classroomId,questionId) => {
  const result = await questionsModel.find(
    {
      deletedAt: { $exists: false },
      _id: questionId,
      classroomId,
      "answers.deletedAt": { $exists: false },
    },
    { answers: 1, _id: 0 }
  );
  return result;
};
module.exports.pushAnswer = async (classroomId,questionId, answer) => {
  const result = await questionsModel.updateOne(
    { _id: questionId,
    classroomId },
    { $push: { answers: answer } }
  );
  return result;
};
module.exports.pullAnswer = async (classroomId, questionId, answerId) => {
  const result = await questionsModel.updateOne(
    { classroomId, _id: questionId, "answers._id": answerId },
    { $set: { "answers.$.deletedAt": Date.now() } }
  );
  return result;
};
