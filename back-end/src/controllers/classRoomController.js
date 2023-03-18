const getClassRooms = async (req, res, next) => {
  try {
    res.json({ message: "getClassRooms" });
  } catch (error) {
    next(error);
  }
};

const getClassRoomById = async (req, res, next) => {
  try {
    res.json({ message: "getClassRoomById" });
  } catch (error) {
    next(error);
  }
};

const addClassRoom = async (req, res, next) => {
  try {
    res.json({ message: "addClassRoom" });
  } catch (error) {
    next(error);
  }
};

const updateClassRoom = async (req, res, next) => {
  try {
    res.json({ message: "updateClassRoom" });
  } catch (error) {
    next(error);
  }
};

const deleteClassRoom = async (req, res, next) => {
  try {
    res.json({ message: "deleteClassRoom" });
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
