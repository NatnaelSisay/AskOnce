const {
  findAllAnswers,
  pushAnswer,
  pullAnswer,
} = require("../respository/questionRepository");

module.exports.getAllAnswers = async (req, res, next) => {
  try {
      const questionId  = req.params.questionId;
    console.log("coooo");
     const result = await findAllAnswers("6414f0dce1b1e59edb517f49");

    res.json({
      success: true,
      data: result,
    });
   
  } catch (err) {
    next(err);
  }
};
module.exports.createAnswer = async (req, res, next) => {
  try {
    const { classroomId, questionId } = req.params;
    const answer = req.body;
    const result = await pushAnswer(classroomId, questionId, answer);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteAnswer = async (req, res, next) => {
  try {
    const { classroomId, questionId, answerId } = req.params;
    const result = await pullAnswer(classroomId, questionId, answerId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
