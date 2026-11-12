const responseStatus = require("../../handlers/responseStatus.handler");
const Admin = require("../../models/Staff/admin.model");
const Teacher = require("../../models/Staff/teachers.model");
const { adminPublishResultService } = require("../../services/academic/results.service");
const {
  registerAdminService,
  getAdminsService,
  loginAdminService,
  getSingleProfileService,
  updateAdminService,
} = require("../../services/staff/admin.service");

/**
 * @desc Register Admin
 * @route POST /api/v1/admin/register
 * @access Private(admin)
 **/
exports.registerAdminController = async (req, res) => {
  try {
    await registerAdminService(req.body, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Login Admin
 * @route POST /api/v1/admin/login
 * @access Private
 **/
exports.loginAdminController = async (req, res) => {
  try {
    await loginAdminService(req.body, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all admins
 * @route GET /api/v1/admins
 * @access Private
 **/
exports.getAdminsController = async (req, res) => {
  try {
    const result = await getAdminsService();
    responseStatus(res, 201, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get current admin
 * @route GET /api/v1/admin/profile
 * @access Private
 **/
exports.getAdminProfileController = async (req, res) => {
  try {
    await getSingleProfileService(req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update admin
 * @route PUT /api/v1/admin/:id
 * @access Private
 **/
exports.updateAdminController = async (req, res) => {
  try {
    await updateAdminService(req.userAuth.id, req.body, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Delete admin
 * @route DELETE /api/v1/admins/:id
 * @access Private
 **/
exports.deleteAdminController = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id).select("-password");
    if (!admin) return responseStatus(res, 404, "failed", "Admin not found");
    return responseStatus(res, 200, "success", admin);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin suspends a teacher
 * @route PUT /api/v1/admins/suspend/teacher/:id
 * @access Private
 **/
exports.adminSuspendTeacherController = async (req, res) => {
  try {
    return await setTeacherStatus(req, res, { isSuspended: true });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin unsuspends a teacher
 * @route PUT /api/v1/admins/unsuspend/teacher/:id
 * @access Private
 **/
exports.adminUnSuspendTeacherController = async (req, res) => {
  try {
    return await setTeacherStatus(req, res, { isSuspended: false });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin withdraws a teacher
 * @route PUT /api/v1/admins/withdraw/teacher/:id
 * @access Private
 **/
exports.adminWithdrawTeacherController = async (req, res) => {
  try {
    return await setTeacherStatus(req, res, { isWithdrawn: true });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin un-withdraws a teacher
 * @route PUT /api/v1/admins/unwithdraw/teacher/:id
 * @access Private
 **/
exports.adminUnWithdrawTeacherController = async (req, res) => {
  try {
    return await setTeacherStatus(req, res, { isWithdrawn: false });
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin publishes exam result
 * @route PUT /api/v1/admins/publish/result/:id
 * @access Private
 **/
exports.adminPublishResultsController = async (req, res) => {
  try {
    return await adminPublishResultService(req.params.id, res, true);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin un-publishes exam result
 * @route PUT /api/v1/admins/unpublish/result/:id
 * @access Private
 **/
exports.adminUnPublishResultsController = async (req, res) => {
  try {
    return await adminPublishResultService(req.params.id, res, false);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

const setTeacherStatus = async (req, res, updates) => {
  const teacher = await Teacher.findByIdAndUpdate(req.params.id, updates, { new: true }).select("-password");
  if (!teacher) return responseStatus(res, 404, "failed", "Teacher not found");
  return responseStatus(res, 200, "success", teacher);
};
