const express = require("express");
const AnswerRouter = require("./answerRouter");

const QuestionRouter = new express.Router();

QuestionRouter.use("/:question_id/answer", AnswerRouter);

module.exports = QuestionRouter;
