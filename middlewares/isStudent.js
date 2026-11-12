const responseStatus = require("../handlers/responseStatus.handler");
const Student = require("../models/Students/students.model");

const isStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.userAuth.id);
    if (student?.role === "student") return next();
    return responseStatus(res, 403, "failed", "Student access required");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Unable to verify student access");
  }
};
module.exports = isStudent;
