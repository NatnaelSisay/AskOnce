const express = require("express");

const {
  getAllQuestionInClassRoom,
  createQuestion,
  searchForQuestionsByTitle,
  deleteQuestion,
  getAllQuestionsForATag,
  getAllTagsForClass,
} = require("../controllers/questionController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const AnswerRouter = require("./answerRouter");

const QuestionRouter = express.Router({ mergeParams: true });
const dumRouter = express.Router({ mergeParams: true });

QuestionRouter.get("/", authMiddleWare(), getAllQuestionInClassRoom);
QuestionRouter.post("/", createQuestion);
QuestionRouter.get(
  "/search",
  authMiddleWare(),
  express.json(),
  searchForQuestionsByTitle
);
QuestionRouter.post(
  "/tagfiltred",
  authMiddleWare(),
  express.json(),
  getAllQuestionsForATag
);
QuestionRouter.delete("/:questionId", authMiddleWare(), deleteQuestion);
QuestionRouter.use("/:questionId/answers", authMiddleWare(), AnswerRouter);
QuestionRouter.get("/tags/list", authMiddleWare(), getAllTagsForClass);

module.exports = QuestionRouter;
