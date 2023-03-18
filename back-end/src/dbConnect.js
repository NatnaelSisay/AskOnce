require("dotenv").config();
const mongoose = require("mongoose");

module.exports.connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ask-once");
    console.log("mongo connected");
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
