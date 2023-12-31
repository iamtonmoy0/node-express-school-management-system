const responseStatus = require("../../handlers/responseStatus.handler");
const {
  createTeacherService,
  teacherLoginService,
  getAllTeachersService,
  getTeacherProfileService,
  updateTeacherProfileService,
  adminUpdateTeacherProfileService,
} = require("../../services/staff/teachers.service");

/**
 * @desc Admin create teacher
 * @route POST /api/v1/create-teacher
 * @access Private (admin)
 **/
exports.createTeacherController = async (req, res) => {
  try {
    await createTeacherService(req.body, req.userAuth.id, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Teacher login
 * @route POST /api/v1/teacher/login
 * @access Public
 **/
exports.teacherLoginController = async (req, res) => {
  try {
    await teacherLoginService(req.body, res);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get all teachers
 * @route GET /api/v1/teachers
 * @access Private (admin)
 **/
exports.getAllTeachersController = async (req, res) => {
  try {
    const result = await getAllTeachersService();
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Get teacher profile
 * @route GET /api/v1/teacher/profile
 * @access Private (teacher)
 **/
exports.getTeacherProfileController = async (req, res) => {
  try {
    const result = await getTeacherProfileService(req.params.teacherId);
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Update teacher profile
 * @route PATCH /api/v1/teacher/update-profile
 * @access Private (Teacher)
 **/
exports.updateTeacherProfileController = async (req, res) => {
  try {
    const result = await updateTeacherProfileService(
      req.body,
      req.userAuth.id,
      res
    );
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};

/**
 * @desc Admin update teacher profile
 * @route PATCH /api/v1/teacher/:teachersId/update-profile
 * @access Private (Admin)
 **/
exports.adminUpdateTeacherProfileController = async (req, res) => {
  try {
    const result = await adminUpdateTeacherProfileService(
      req.body,
      req.params.teachersId
    );
    responseStatus(res, 200, "success", result);
  } catch (error) {
    responseStatus(res, 400, "failed", error.message);
  }
};
