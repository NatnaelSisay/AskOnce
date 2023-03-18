const { getAllAnswers, pushAnswer,pullAnswer } = require("../respository/questionRepository");

module.exports.getAllAnswers = async (res, req, next) => {
  try {
    
    const {classroomId, questionId } = req.params;
    const result = await getAllAnswers(classroomId,questionId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.createAnswer = async (res, req, next) => {
    try {
        const {classroomId, questionId } = req.params;
        const answer= req.body;
        const result = await pushAnswer(classroomId,questionId, answer);
    
        res.json({
          success: true,
          data: result,
        });
      } catch (err) {
        next(err);
      }
};
module.exports.deleteAnswer = async (res, req, next) => {
    try {
        const {classroomId, questionId , answerId } = req.params;
        const result = await pullAnswer(classroomId,questionId, answerId);
        
        

    
        res.json({
          success: true,
          data: result,
        });
      } catch (err) {
        next(err);
      }
};
