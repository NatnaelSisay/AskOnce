const express = require("express");
const QuestionRouter = require("./questionRouter");
const StudentsRouter = require("./studentsRouter");
const ClassRoomRouter = new express.Router();

ClassRoomRouter.use("/:classroomId/questions", QuestionRouter);
ClassRoomRouter.use("/:classroomId/memeber/", StudentsRouter);

module.exports = ClassRoomRouter;
