const classRoomModel = require("../models/classRoomModel");

module.exports.getAllStudents = async (classId, limit = 30, page = 1) => {
  const result = await classRoomModel.findOne(
    { _id: classId },
    {
      students: { $slice: [(page - 1) * limit, limit] },
      page: page + 1,
      limit: limit,
    }
  );
  return result;
};

module.exports.addStudent = async (classId, student) => {
  await classRoomModel.findOneAndUpdate(
    { _id: classId },
    {
      $push: {
        students: student,
      },
    }
  );
};
module.exports.removeStudent = async (classId, student) => {
  await classRoomModel.findOneAndUpdate(
    { _id: classId },
    {
      $pull: {
        students: {
          $elemMatch: { _id: student._id },
        },
      },
    }
  );
};
