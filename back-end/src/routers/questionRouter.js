const express = require("express");
const QuestionRouter = express.Router();
const {
  getAllQuestionInClassRoom,
  createQuestion,
  searchForQuestionsByTitle,
  deleteQuestion,
  getAllQuestionsForATag,
} = require("../controllers/questionController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const AnswerRouter = require("./answerRouter");
const answerRouter = require("./answerRouter");

QuestionRouter.get("/",authMiddleWare(),getAllQuestionInClassRoom);
QuestionRouter.post("/", authMiddleWare(), express.json(), createQuestion);
QuestionRouter.get("/",authMiddleWare(),express.json(),searchForQuestionsByTitle);
QuestionRouter.get("/:tag",authMiddleWare(),express.json(),getAllQuestionsForATag);
QuestionRouter.delete("/:questionid", authMiddleWare(), deleteQuestion);
QuestionRouter.use("/:questionId/answers", authMiddleWare(), AnswerRouter);

module.exports = QuestionRouter;
