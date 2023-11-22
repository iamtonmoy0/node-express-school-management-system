// Response Handler
const responseStatus = require("../../handlers/responseStatus.handler");
const {
  studentCheckExamResultService,
  getAllExamResultsService,
  adminPublishResultService,
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
// TODO:need to work on the publish and unpublish
/**
 * @desc Admin publishes exam result
 * @route PATCH /api/v1/admin/publish/result/:examId
 * @access Private
 **/
exports.adminPublishResultsController = async (req, res) => {
  try {
    await adminPublishResultService(req.params.examId, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin un-publishes exam result
 * @route PUT /api/v1/admin/unpublish/result/:examId
 * @access Private
 **/
exports.adminUnPublishResultsController = (req, res) => {
  try {
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
