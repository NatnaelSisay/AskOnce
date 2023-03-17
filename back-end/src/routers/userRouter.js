const express = require("express");
const {
  loginController,
  signupController,
} = require("../controllers/userController");
const { signupMiddleware } = require("../middlewares/signupMiddleware");
const UserRouter = new express.Router();

UserRouter.post("/signup", signupMiddleware, signupController);

module.exports = UserRouter;
