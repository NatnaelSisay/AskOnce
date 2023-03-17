require("dotenv").config();
const mongoose = require("mongoose");

module.exports.connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("mongo connected");
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
