const express = require("express");

const {
  getAllQuestionInClassRoom,
  createQuestion,
  searchForQuestionsByTitle,
  deleteQuestion,
  getAllQuestionsForATag,
} = require("../controllers/questionController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const AnswerRouter = require("./answerRouter");

const QuestionRouter = express.Router({ mergeParams: true});
const dumRouter = express.Router({ mergeParams: true});


QuestionRouter.get("/",authMiddleWare(),getAllQuestionInClassRoom);
QuestionRouter.post("/", authMiddleWare(), express.json(), createQuestion);
QuestionRouter.get("/search",authMiddleWare(),express.json(),searchForQuestionsByTitle);
QuestionRouter.get("/:tag",authMiddleWare(),express.json(),getAllQuestionsForATag);
QuestionRouter.delete("/:questionId", authMiddleWare(), deleteQuestion);
QuestionRouter.use("/:questionId/answers",authMiddleWare(), AnswerRouter);


module.exports = QuestionRouter;
