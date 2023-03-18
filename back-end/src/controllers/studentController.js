const studentRepository = require("../respository/studentRepository");

module.exports.getStudents = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { limit, page } = req.query;
    const result = await studentRepository.getAllStudents(
      class_id,
      limit,
      page
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.addStudent = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const student = req.body;
    const result = await studentRepository.addStudent(class_id, student);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.removeStudent = async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { student_id } = req.query;
    const result = await studentRepository.removeStudent(class_id, student_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
