const express = require("express");
const { ROLES_ENUM } = require("../constants");
const {
  getStudents,
  addStudent,
  removeStudent,
} = require("../controllers/studentController");
const { authMiddleWare } = require("../middlewares/authMiddleware");

const StudentsRouter = express.Router({ mergeParams: true });
StudentsRouter.use(express.json());
StudentsRouter.get("/", authMiddleWare(), getStudents);
StudentsRouter.post("/", authMiddleWare(ROLES_ENUM.professor), addStudent);
StudentsRouter.delete(
  "/:student_id",
  authMiddleWare(ROLES_ENUM.professor),
  removeStudent
);
module.exports = StudentsRouter;
