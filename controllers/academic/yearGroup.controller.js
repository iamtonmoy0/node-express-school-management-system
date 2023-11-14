const responseStatus = require("../../handlers/responseStatus.handler");
const {
  getAllYearGroupsService,
  createYearGroupService,
  getYearGroupsService,
  deleteYearGroupService,
  updateYearGroupService,
} = require("../../services/academic/yearGroup.service");

/**
 * @desc Create YearGroup
 * @route POST /api/v1/year-group
 * @access Private
 **/
exports.createYearGroupController = async (req, res) => {
  try {
    await createYearGroupService(req.body, req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all YearGroups
 * @route GET /api/v1/year-group
 * @access Private
 **/
exports.getYearGroupsController = async (req, res) => {
  try {
    const result = await getAllYearGroupsService();
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get single YearGroup
 * @route GET /api/v1/year-group/:id
 * @access Private
 **/
exports.getYearGroupController = async (req, res) => {
  try {
    const result = await getYearGroupsService(req.params.id);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update YearGroup
 * @route Patch /api/v1/year-group/:id
 * @access Private
 **/
exports.updateYearGroupController = async (req, res) => {
  try {
    await updateYearGroupService(req.body, req.params.id, req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Delete YearGroup
 * @route Delete /api/v1/year-group/:id
 * @access Private
 **/
exports.deleteYearGroupController = async (req, res) => {
  try {
    const result = await deleteYearGroupService(req.params.id);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
