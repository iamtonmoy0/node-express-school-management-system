const responseStatus = require("../handlers/responseStatus.handler");
const Teacher = require("../models/Staff/teachers.model");

const isTeacher = async (req, res, next) => {
  const userId = req.userAuth.id;
  const teacher = await Teacher.findById(userId);
  if (teacher?.role === "student") {
    next();
  } else {
    responseStatus(res, 403, "failed", "Access Denied.teachers only route!");
  }
};
module.exports = isTeacher;
