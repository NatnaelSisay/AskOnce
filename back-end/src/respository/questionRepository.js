const { default: mongoose } = require("mongoose");
const questionsModel = require("../models/questionModel");

module.exports.findAllQuestions = async (classroomId) => {
  const result = await questionsModel.find({
    classroomId,
    deletedAt: { $exists: false },
  });
  return result;
};
module.exports.findQuestionsByTags = async (classroomId, tag) => {
  const result = await questionsModel.find({
    classroomId,
    deletedAt: { $exists: false },
    tags: { $in: [...tag] },
  });

  return result;
};
module.exports.createQuestion = async (classroomId, data) => {
  const newQuestion = new questionsModel({
    question: data.question,
    tags: data.tags,
    description: data?.description,

    answers: [],
    askedBy: data.askedBy,
    classroomId: classroomId,
  });

  const result = await newQuestion.save();

  return result.toObject();
};
module.exports.findAquestionsByTitle = async (classroomId, title) => {
  const result = await questionsModel.find({
    classroomId,
    deletedAt: { $exists: false },
    $text: { $search: title },
  });

  return result;
};
module.exports.deleteAquestion = async (classroomId, id) => {
  // const result= await questionsModel.findByIdAndDelete(id);
  const result = await questionsModel.updateOne(
    { _id: id, classroomId },
    { $set: { deletedAt: Date.now() } }
  );
  
  return result;
};
module.exports.getAllTags = async (classroomId) => {
  const result = await questionsModel.aggregate([
    { $match: { classroomId } },
    {$match: {deletedAt: {$exists: false}}},
    { $unwind: "$tags" },
    { $group: { _id: null, tags: { $addToSet: "$tags" } } },
    { $project: { _id: 0 } },
  ]);
  return result;
};
module.exports.findAllAnswers = async (classroomId, questionId) => {
  const result = await questionsModel.aggregate([
    [
      { $match: { _id: new mongoose.Types.ObjectId(questionId) } },
      { $unwind: "$answers" },
      { $match: { "answers.deletedAt": { $exists: false } } },
      { $group: { _id: "$_id", answers: { $push: "$answers" } } },
    ],
  ]);

  return result;
};
module.exports.pushAnswer = async (classroomId, questionId, answer) => {
  console.log(answer);
  const result = await questionsModel.findOneAndUpdate(
    { _id: questionId, classroomId },
    { $push: { answers: answer } },
    {
      returnDocument: "after",
      projection: {
        _id: 0,
        answers: 0,
        answer: {
          $arrayElemAt: ["$answers", -1],
        },
      },
    }
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
