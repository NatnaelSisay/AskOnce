const express = require("express");
const { ROLES_ENUM } = require("../constants");
const {
  loginController,
  signupController,
} = require("../controllers/userController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { logginMiddleware } = require("../middlewares/loginMiddleware");
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const UserRouter = new express.Router();

UserRouter.post("/login", logginMiddleware, loginController);
UserRouter.post("/signup", signupMiddleware, signupController);

// example routes for auth middleware
UserRouter.get("/professor", authMiddleWare(ROLES_ENUM.professor), (req, res) =>
  res.json({ message: "yes professor" })
);
UserRouter.get("/student", authMiddleWare(ROLES_ENUM.student), (req, res) =>
  res.json({ message: "yes student" })
);
UserRouter.get("/any", authMiddleWare(), (req, res) =>
  res.json({ message: "yes any authenticated" })
);

module.exports = UserRouter;
