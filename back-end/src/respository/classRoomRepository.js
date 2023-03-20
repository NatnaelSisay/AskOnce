const ClassRoomModel = require("../models/classRoomModel");

module.exports.getAllClassesForUser = async (user_id) => {
  const result = await ClassRoomModel.find({
    $and: [
      {
        $or: [{ "professor._id": user_id }, { "students._id": user_id }],
      },
      { deletedAt: null },
    ],
  });
  return result;
};

module.exports.getClassRoomById = async (classroom_id) => {
  return await ClassRoomModel.findOne({
    $and: [{ _id: classroom_id }, { deletedAt: null }],
  });
};

module.exports.addClassRoom = async (
  classRoomName,
  professorDetail,
  students
) => {
  let result = await ClassRoomModel.findOne({
    name: classRoomName,
  });

  if (!result) {
    const newClassRoom = new ClassRoomModel({
      name: classRoomName,
      professor: professorDetail,
      students,
    });
    result = await newClassRoom.save();
  }
  return result;
};

module.exports.updateClassRoom = async (classroom_id, classroom_update) => {
  let result = await ClassRoomModel.findOne({
    _id: classroom_id,
  });

  if (result) {
    result = await ClassRoomModel.updateOne(
      { _id: classroom_id },
      { $set: { name: classroom_update.name } }
    );
  }

  return result;
};

module.exports.deleteClassRoom = async (classroom_id) => {
  const result = await ClassRoomModel.updateOne(
    { _id: classroom_id },
    { $set: { deletedAt: Date.now() } }
  );
  return result;
};
