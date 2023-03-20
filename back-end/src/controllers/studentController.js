const ResponseError = require("../errors/ResponseError");
const studentRepository = require("../respository/studentRepository");

module.exports.getStudents = async (req, res, next) => {
  console.log("getStudents");
  try {
    const { class_id } = req.params;
    const { limit, page } = req.query;
    if (limit === undefined || page === undefined) {
      throw new ResponseError(400, "Missing limit or page query");
    }
    const result = await studentRepository.getAllStudents(
      class_id,
      Number.parseInt(limit) === NaN ? 30 : Number.parseInt(limit),
      Number.parseInt(page) === NaN ? 1 : Number.parseInt(page)
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
    const { class_id, student_id } = req.params;
    const result = await studentRepository.removeStudent(class_id, student_id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
