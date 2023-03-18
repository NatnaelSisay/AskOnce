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

const getClassRooms = async (req, res, next) => {
  try {
    const result = await ClassRoomModel.find({});
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

    const result = await ClassRoomModel.findOne({ _id: classroom_id });
    if (!result) {
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

const addClassRoom = async (req, res, next) => {
  try {
    let result = await ClassRoomModel.findOne({
      name: req.body?.name,
    });

    if (result) {
      return res.json({ success: true, data: result });
    } else {
      const newClassRoom = new ClassRoomModel(req.body);
      result = await newClassRoom.save();
    }

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

    const result = await ClassRoomModel.updateOne(
      { _id: classroom_id },
      { $set: { name: req.body.name } }
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

    const result = await ClassRoomModel.updateOne(
      { _id: classroom_id },
      { $set: { deletedAt: Date.now().toString() } }
    );

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
  getClassRooms,
  getClassRoomById,
  addClassRoom,
  updateClassRoom,
  deleteClassRoom,
};
