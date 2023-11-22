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
  let student = await Results.findOne({ student: studentId });
  if (!student) return responseStatus(res, 404, "failed", "Student not found");

  // Finding the result for the given exam and student
  const result = await Results.findOne({
    exam: examId,
    student: studentId,
  })
    .populate({
      path: "exam",
      populate: {
        path: "questions",
      },
    })
    .populate("classLevel")
    .populate("subject")
    .populate("academicTerm")
    .populate("academicYear");

  // Checking if the result is published
  if (!result?.isPublished)
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
  const result = await Results.find({ classLevel: classId });

  // Checking if the teacher has access to the results
  if (result.teacher === teacherId) {
    return responseStatus(res, 200, "success", result);
  } else {
    return responseStatus(res, 401, "fail", "Unauthorized access");
  }
};
/**
 * Admin publishes the exam result
 * @param {}
 */
exports.adminPublishResultService = async (examId,res) => {
  // Finding the exam
  const exam = await Results.findById(examId);
  if(!exam){
    return responseStatus(res, 404, "fail", "Exam not found")
  }
};
