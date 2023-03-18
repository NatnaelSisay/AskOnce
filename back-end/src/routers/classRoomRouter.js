const express = require("express");
const QuestionRouter = require("./questionRouter");
const StudentsRouter = require("./studentsRouter");
const ClassRoomRouter = new express.Router();

ClassRoomRouter.use("/:classroomId/questions", QuestionRouter);
ClassRoomRouter.use("/:class_id/students/", StudentsRouter);

module.exports = ClassRoomRouter;
