const express = require("express");

const QuestionRouter = require("./questionRouter");
const StudentsRouter = require("./studentsRouter");

const { authMiddleWare } = require("../middlewares/authMiddleware");
const { ROLES_ENUM } = require("../constants");
const {
  getClassRooms,
  getClassRoomById,
  addClassRoom,
  updateClassRoom,
  deleteClassRoom,
} = require("../controllers/classRoomController");

const ClassRoomRouter = new express.Router();

ClassRoomRouter.use("/:classroomId/questions", QuestionRouter);
ClassRoomRouter.use("/:class_id/students/", StudentsRouter);

ClassRoomRouter.use(authMiddleWare(ROLES_ENUM.professor));
ClassRoomRouter.get("/", getClassRooms); // admin should have this priviledge
ClassRoomRouter.get("/:classroom_id", getClassRoomById);
ClassRoomRouter.post("/", addClassRoom);
ClassRoomRouter.put("/:classroom_id", updateClassRoom);
ClassRoomRouter.delete("/:classroom_id", deleteClassRoom);

module.exports = ClassRoomRouter;
