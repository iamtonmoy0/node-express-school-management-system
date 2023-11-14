const responseStatus = require("../../handlers/responseStatus.handler");
const {
  createExamService,
  getAllQuestionsService,
  getQuestionsByIdService,
  updateQuestionsService,
} = require("../../services/academic/questions.service");

/**
 * @desc Create Question
 * @route POST /questions/:examId/create
 * @access Private (Teachers Only)
 **/
exports.createQuestionsController = async (req, res) => {
  try {
    await createExamService(req.body, req.params.examId, req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all questions
 * @route GET /api/v1/questions
 * @access Private - Teacher only
 **/
exports.getAllQuestionsController = async (req, res) => {
  try {
    const result = await getAllQuestionsService();
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get question by ID
 * @route GET /api/v1/questions/:id
 * @access Private
 **/
exports.getQuestionByIdController = async (req, res) => {
  try {
    const result = await getQuestionsByIdService(req.params.id);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update Question
 * @route PATCH /api/v1/questions/:id
 * @access Private Teacher only
 **/
exports.updateQuestionController = async (req, res) => {
  try {
    await updateQuestionsService(req.body, req.params.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
