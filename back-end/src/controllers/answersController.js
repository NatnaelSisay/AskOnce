const { verifyJwt } = require("../jwtUtil");
const {
  findAllAnswers,
  pushAnswer,
  pullAnswer,
} = require("../respository/questionRepository");

module.exports.getAllAnswers = async (req, res, next) => {
  try {
    const { classroomId, questionId } = req.params;

    const result = await findAllAnswers(classroomId, questionId);

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
    const answeredBy = verifyJwt(req.headers.authorization.split(" ")[1]);
    const result = await pushAnswer(classroomId, questionId, {
      answer: answer.answer,
      user: answeredBy,
    });

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

    if (result.matchedCount === 0) {
      res.status(404).json({
        success: false,
        message: "Answer not found",
      });
      return;
    }
    if (result.modifiedCount === 0) {
      res.status(400).json({
        success: false,
        message: "Answer already deleted",
      });
      return;
    }
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
