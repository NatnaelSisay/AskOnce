const {
  findAllQuestions,
  createQuestion,
  findQuestionsByTags,
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

    const result = await createQuestion(data);

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
    const title = req.body.title;
    const result = await findAquestionsByTitle(title);

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
    const id = req.params.id;
    const result = await deleteAquestion(id);

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
    const { classroomId } = req.params;
    const tag = req.body.tag;
    const result = await findQuestionsByTags(tag);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
