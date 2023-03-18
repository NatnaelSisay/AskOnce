const express = require("express");
const { getAllAnswers, createAnswer, deleteAnswer } = require("../controllers/answersController");
const AnswerRouter = express.Router({ mergeParams: true });

AnswerRouter.get("/", getAllAnswers);
AnswerRouter.post("/", express.json(), createAnswer);
AnswerRouter.delete("/:answerId", deleteAnswer);




module.exports = AnswerRouter;
