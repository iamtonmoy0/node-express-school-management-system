const responseStatus = require("../../handlers/responseStatus.handler")
const { createTeacherServices, teacherLoginService, getTeacherProfileService } = require("../../services/staff/teachers.services")


//@desc Admin create teacher
//@route POST /api/v1/create-teacher
//@access Private (admin)
exports.createTeacherController = async (req, res) => {
	try {
		const result = await createTeacherServices(req.body,req.userAuth.id);
		responseStatus(res,200,"success",result);
	} catch (error) {
		responseStatus(res,400,"failed",error.message);
	}
}
//@desc  teacher login
//@route POST /api/v1/teacher/login
//@access Public
exports.teacherLoginController = async (req, res) => {
	try {
		const result = await teacherLoginService(req.body);
		responseStatus(res,200,"success",result);
	} catch (error) {
			responseStatus(res,400,"failed",error.message);
	}
}
//@desc  get all teachers
//@route Get /api/v1/teachers
//@access Private (admin)
exports.getAllTeachersController = async (req, res) => {
	try {
		const result = await gatAllTeachersService();
		responseStatus(res,200,"success",result);
	} catch (error) {
			responseStatus(res,400,"failed",error.message);
	}
}
//@desc  get teacher profile
//@route Get /api/v1/teacher/profile
//@access Private (teacher)
exports.getTeacherProfileController = async (req, res) => {
	try {
		const result = await getTeacherProfileService(req.params.id);
		responseStatus(res,200,"success",result);
		} catch (error) {
			responseStatus(res,400,"failed",error.message);
			}
}
//@desc  update teacher profile
//@route POST /api/v1/teacher/:id/profile
//@access Private (Admin)
exports.updateTeacherProfileController = async (req, res) => {
	try {
		const result = await updateTeacherProfileService(req.params.id, req.body);
		responseStatus(res,200,"success",result);
		} catch (error) {
			responseStatus(res,400,"failed",error.message);
			}
}