const {
  findAllQuestions,
  createQuestion,
  findQuestionsByTags,
  deleteAquestion,
  findAquestionsByTitle
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
    // const { classroomId } = req.params;
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
    // const { classroomId } = req.params;
    const {title} = req.query;
    console.log(title);
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
    // const { classroomId } = req.params;
    const {questionId} = req.params
    console.log(questionId);
    const result = await deleteAquestion(questionId);

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
    
    console.log(tag);
    const result = await findQuestionsByTags(tag);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
