const responseStatus = require("../../handlers/responseStatus.handler");
const { createAcademicTermService, getAcademicTermsService, getAcademicTermService, updateAcademicTermService, deleteAcademicTermService } = require("../../services/academic/academicTerm.service");

/**
 * @desc Create Academic Term
 * @route POST /api/v1/academic-Terms
 * @access Private
 **/
exports.createAcademicTermController = async (req, res) => {
  try {
    const result = await createAcademicTermService(req.body, req.userAuth.id);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all Academic Terms
 * @route GET /api/v1/academic-Terms
 * @access Private
 **/
exports.getAcademicTermsController = async (req, res) => {
  try {
    const result = await getAcademicTermsService();
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get single Academic Term
 * @route GET /api/v1/academic-Terms/:id
 * @access Private
 **/
exports.getAcademicTermController = async (req, res) => {
  try {
    const result = await getAcademicTermService(req.params.id);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update Academic Term
 * @route Patch /api/v1/academic-Terms/:id
 * @access Private
 **/
exports.updateAcademicTermController = async (req, res) => {
  try {
    const result = await updateAcademicTermService(req.body, req.params.id, req.userAuth.id);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Delete Academic Term
 * @route Delete /api/v1/academic-Terms/:id
 * @access Private
 **/
exports.deleteAcademicTermController = async (req, res) => {
  try {
    const result = await deleteAcademicTermService(req.params.id);
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
