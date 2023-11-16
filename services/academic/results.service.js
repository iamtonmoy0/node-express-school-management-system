const responseStatus = require("../../handlers/responseStatus.handler");
const Results = require("../../models/Academic/results.model");
// students check exam result
exports.studentCheckExamResultService = async (examId, studentId, res) => {
  // checking if student Exist
  let student = await Results.findOne({ student: studentId });
  if (!student) return responseStatus(res, 404, "failed", "Student Not found");

  const result = await Results.findOne({ exam: examId, student: studentId });
  if (!result?.isPublished)
    return responseStatus(
      res,
      400,
      "failed",
      "Result is not published yet! please wait for further notice"
    );
	return responseStatus(res, 200, "success", result);
};
// get all result by teacher
exports.getAllExamResultsService = async (classId, teacherId, res) => {
  const result = await Results.find({ classLevel: classId });
  if (result.teacher === teacherId) {
    return responseStatus(res, 200, "success", result);
  } else {
    return responseStatus(res, 401, "fail", "Un-Authorized access");
  }
};
