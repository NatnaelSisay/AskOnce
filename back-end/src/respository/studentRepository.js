const classRoomModel = require("../models/classRoomModel");

module.exports.getAllStudents = async (classId, limit = 30, page = 1) => {
  const result = await classRoomModel.findOne(
    { _id: classId },
    {
      _id: 0,
      page: `${page}`,
      limit: `${limit}`,
      students: { $slice: [(page - 1) * limit, limit] },
    }
  );
  return result;
};

module.exports.addStudent = async (classId, student) => {
  await classRoomModel.findOneAndUpdate(
    { _id: classId },
    {
      $push: {
        students: {
          _id: student._id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          role: student.role,
        },
      },
    }
  );
};
module.exports.removeStudent = async (classId, student_id) => {
  const result = await classRoomModel.updateOne(
    { _id: classId },
    {
      $pull: {
        students: {
          _id: student_id,
        },
      },
    }
  );
  return result;
};
