const express = require("express");
const {
  loginController,
  signupController,
} = require("../controllers/userController");
const { logginMiddleware } = require("../middlewares/loginMiddleware");
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const UserRouter = new express.Router();

UserRouter.post("/login", logginMiddleware, loginController);
UserRouter.post("/signup", signupMiddleware, signupController);

module.exports = UserRouter;
