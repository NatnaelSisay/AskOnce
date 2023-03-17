require("dotenv").config();
const mongoose = require("mongoose");

module.exports.connectDb = async () => {
  try {
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("mongo connected");
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
