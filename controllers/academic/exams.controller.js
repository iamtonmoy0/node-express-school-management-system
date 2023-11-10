const responseStatus = require('../../handlers/responseStatus.handler');
const { getAllExamService, createExamService, getExamByIdService, updateExamService } = require('../../services/academic/exams.service');

/**
 * @desc Create new exam
 * @route POST /api/v1/exams
 * @access Private (Teacher Only)
 **/
exports.createExamController = async (req, res) => {
  try {
    const result = await createExamService(req.body, req.userAuth.id);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all exams
 * @route GET /api/v1/exams
 * @access Private (Teacher Only)
 **/
exports.getAllExamController = async (req, res) => {
  try {
    const result = await getAllExamService();
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get exam by ID
 * @route GET /api/v1/exams/:examId
 * @access Private (Teacher Only)
 **/
exports.getExamByIdController = async (req, res) => {
  try {
    const result = await getExamByIdService(req.params.examId);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update Exam
 * @route PATCH /api/v1/exams/:id
 * @access Private (Teacher Only)
 **/
exports.updateExamController = async (req, res) => {
  try {
    const result = await updateExamService(req.body, req.params.examId);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
