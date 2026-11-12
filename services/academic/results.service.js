const responseStatus = require("../../handlers/responseStatus.handler");
const Results = require("../../models/Academic/results.model");

/**
 * Service to check exam result for a student
 * @param {string} examId - The ID of the exam
 * @param {string} studentId - The ID of the student
 * @param {Object} res - Express response object
 */
exports.studentCheckExamResultService = async (examId, studentId, res) => {
  // Checking if the student exists
  const result = await Results.findOne({
    exam: examId,
    student: studentId,
  })
    .populate("exam")
    .populate("classLevel")
    .populate("subject")
    .populate("academicTerm")
    .populate("academicYear");

  // Checking if the result is published
  if (!result) return responseStatus(res, 404, "failed", "Result not found");
  if (!result.isPublished)
    return responseStatus(
      res,
      400,
      "failed",
      "Result is not published yet! Please wait for further notice"
    );

  return responseStatus(res, 200, "success", result);
};

/**
 * Service to get all exam results for a class by a teacher
 * @param {string} classId - The ID of the class
 * @param {string} teacherId - The ID of the teacher
 * @param {Object} res - Express response object
 */
exports.getAllExamResultsService = async (classId, teacherId, res) => {
  // Finding all results for the given class
  const result = await Results.find({ classLevel: classId, teacher: teacherId });

  // Checking if the teacher has access to the results
  return responseStatus(res, 200, "success", result);
};
/**
 * Admin publishes the exam result
 * @param {}
 */
exports.adminPublishResultService = async (examId, res, isPublished = true) => {
  const results = await Results.updateMany({ exam: examId }, { $set: { isPublished } });
  if (!results.matchedCount) return responseStatus(res, 404, "failed", "Exam results not found");
  return responseStatus(res, 200, "success", { updated: results.modifiedCount, isPublished });
};
