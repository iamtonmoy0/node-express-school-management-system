const responseStatus = require("../handlers/responseStatus.handler");
const Teacher = require("../models/Staff/teachers.model");

const isTeacher = async (req, res, next) => {
  const userId = req.userAuth.id;
  try {
    const teacher = await Teacher.findById(userId);
    if (!teacher || teacher.role !== "teacher") return responseStatus(res, 403, "failed", "Teacher access required");
    if (teacher.isSuspended || teacher.isWithdrawn) return responseStatus(res, 403, "failed", "Teacher account is inactive");
    return next();
  } catch (error) {
    return responseStatus(res, 500, "failed", "Unable to verify teacher access");
  }
};
module.exports = isTeacher;
