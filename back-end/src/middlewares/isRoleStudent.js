const { ROLES_ENUM } = require("../constants");
const ResponseError = require("../errors/ResponseError");
const { verifyJwt } = require("../jwtUtil");

module.exports.roleIsStudent = async (req, res, next) => {
  try {
    const reqJwt = req.headers?.authorization?.split(" ")[1];
    const decoded = verifyJwt(reqJwt);
    if (decoded.role !== ROLES_ENUM.student) {
      next(new ResponseError(403, { message: "User has no priviledge" }));
    }

    next();
  } catch (error) {
    next(new ResponseError(401, { message: "unauthorized user" }));
  }
};
