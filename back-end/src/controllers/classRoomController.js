/**
 * TODO
 *
 * POST: addClassRoom
 * data validation
 *
 * check if class don't exist
 * shall it be error or return data?
 *
 * when creating multiple class with same professor show
 * professor.email duplication error
 *
 *
 */
const ClassRoomModel = require("../models/classRoomModel");
const ResponseError = require("../errors/ResponseError");
const ClassRoomRepository = require("../respository/classRoomRepository");
const { decodeJwt } = require("../jwtUtil");

const getClassRoomsForUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = decodeJwt(token);
    const result = await ClassRoomRepository.getAllClassesForUser(decode._id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getClassRoomById = async (req, res, next) => {
  try {
    const { classroom_id } = req.params;
    if (!classroom_id) {
      return next(
        new ResponseError(400, { message: "classroom_id not provided" })
      );
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = decodeJwt(token);

    let result = await ClassRoomRepository.getClassRoomById(classroom_id);
    if (!result) {
      return next(
        new ResponseError(400, {
          message: `classroom_id: ${classroom_id} not found`,
        })
      );
    }
    result = result.toObject();

    const isProfessor = decode._id === result.professor._id;
    const student = result.students.find(
      (student) => student._id === decode._id
    );

    if (!isProfessor && !student) {
      return next(
        new ResponseError(403, {
          message: `Access Denied`,
        })
      );
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const addClassRoom = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = decodeJwt(token);

    const result = await ClassRoomRepository.addClassRoom(
      req.body.name,
      decode,
      req.body.students
    );

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const updateClassRoom = async (req, res, next) => {
  try {
    const { classroom_id } = req.params;
    if (!classroom_id) {
      return next(
        new ResponseError(400, { message: "classroom_id not provided" })
      );
    }

    const result = await ClassRoomRepository.updateClassRoom(
      classroom_id,
      req.body
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteClassRoom = async (req, res, next) => {
  try {
    const { classroom_id } = req.params;
    if (!classroom_id) {
      return next(
        new ResponseError(400, { message: "classroom_id not provided" })
      );
    }

    const result = await ClassRoomRepository.deleteClassRoom(classroom_id);

    if (!result.acknowledged) {
      return next(
        new ResponseError(400, {
          message: `classroom_id: ${classroom_id} not found`,
        })
      );
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClassRoomsForUser,
  getClassRoomById,
  addClassRoom,
  updateClassRoom,
  deleteClassRoom,
};
