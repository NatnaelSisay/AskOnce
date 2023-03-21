const express = require("express");
const { ROLES_ENUM } = require("../constants");
const {
  loginController,
  signupController,
  searchUser,
  profileImage,
} = require("../controllers/userController");
const { authMiddleWare } = require("../middlewares/authMiddleware");
const { logginMiddleware } = require("../middlewares/loginMiddleware");
const {
  profileImageUploadMiddleware,
} = require("../middlewares/profileImageUploadMiddleware");
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const UserRouter = new express.Router();

UserRouter.post(
  "/signup",
  profileImageUploadMiddleware.single("profileImage"),
  signupMiddleware,
  signupController
);

UserRouter.get("/", express.json(), authMiddleWare(), searchUser);
UserRouter.get("/profile-image/:filename", authMiddleWare(), profileImage);
UserRouter.post("/login", express.json(), logginMiddleware, loginController);

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
