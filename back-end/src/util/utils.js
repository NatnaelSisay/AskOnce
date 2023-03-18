const mongoose = require("mongoose");
const getObjectId = (value) => {
  return new mongoose.Types.ObjectId(value);
};

module.exports = {
  getObjectId,
};
