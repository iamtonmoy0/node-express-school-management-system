// Response Handler
const responseStatus = require("../../handlers/responseStatus.handler");
const {
  studentCheckExamResultService,
  getAllExamResultsService,
} = require("../../services/academic/results.service");
/**
 * @desc Checking exam results
 * @route Post /api/v1/exam-result/:examId/check
 * @access Private (students only)
 **/
exports.studentCheckExamResultController = async (req, res) => {
  try {
    await studentCheckExamResultService(
      req.params.examId,
      req.userAuth.id,
      res
    );
  } catch (error) {
    responseStatus(res, 400, "fail", error.message);
  }
};
/**
 * @desc Get all exam results
 * @route Get /api/v1/exam-results/:classLevelId
 * @access Private (teachers only)
 **/
exports.getAllExamResultsController = async (req, res) => {
  try {
    await getAllExamResultsService(
      req.params.classLevelId,
      req.userAuth.id,
      res
    );
  } catch (error) {
    responseStatus(res, 400, "fail", error.message);
  }
};

// exports.getAllExamResultsController=async(req,res)=>{
// 	try {
// 		await
// 	} catch (error) {
// 		responseStatus(res,400,"fail",error.message)
// 	}
// }
