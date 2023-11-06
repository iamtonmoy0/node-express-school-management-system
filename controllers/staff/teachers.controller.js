const responseStatus = require("../../handlers/responseStatus.handler")
const { createTeacherServices } = require("../../services/staff/teachers.services")


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