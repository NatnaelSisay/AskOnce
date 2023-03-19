const {
  findAllQuestions,
  createQuestion,
  findQuestionsByTags,
  deleteAquestion,
  findAquestionsByTitle,
} = require("../respository/questionRepository");

module.exports.getAllQuestionInClassRoom = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const result = await findAllQuestions(classroomId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.createQuestion = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const data = req.body;

    const result = await createQuestion(classroomId, data);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.searchForQuestionsByTitle = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const { title } = req.query;

    const result = await findAquestionsByTitle(classroomId, title);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.deleteQuestion = async (req, res, next) => {
  try {
    const { classroomId } = req.params;
    const { questionId } = req.params;

    const result = await deleteAquestion(classroomId, questionId);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllQuestionsForATag = async (req, res, next) => {
  try {
    const { tag } = req.params;
    const { classroomId } = req.params;

    const result = await findQuestionsByTags(classroomId, tag);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
