const Student = require("../../models/Students/students.model");
const responseStatus = require('../../handlers/responseStatus.handler');
const { adminRegisterStudentService, studentLoginService, getStudentsProfileService, getAllStudentsByAdminService, getStudentByAdminService, studentUpdateProfileService, adminUpdateStudentService } = require("../../services/students/students.services");

//@desc  Admin Register Student
//@route POST /api/students/admin/register
//@access  Private Admin only

exports.adminRegisterStudentController =  async(req, res) => {
	try {
		const result = await adminRegisterStudentService()
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}
};

//@desc    login  student
//@route   POST /api/v1/students/login
//@access  Public

exports.studentLoginController =  async(req, res) => {
	try {
		const result = await studentLoginService(req.body)
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}
}

//@desc    Student Profile
//@route   GET /api/v1/students/profile
//@access  Private Student only

exports.getStudentProfileController =  async(req, res) => {
  try {
		const result = await getStudentsProfileService(req.userAuth.id)
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}
 
};

//@desc    Get all Students
//@route   GET /api/v1/admin/students
//@access  Private admin only

exports.getAllStudentsByAdminController =  async(req, res) => {
  try {
		const result = await getAllStudentsByAdminService()
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}

};

//@desc    Get Single Student
//@route   GET /api/v1/students/:studentID/admin
//@access  Private admin only

exports.getStudentByAdminController =  async(req, res) => {
try {
  const result = await getStudentByAdminService(req.userAuth.id)
  responseStatus(res,200,'success',result)
} catch (error) {
  responseStatus(res,400,'failed',error.message)
}

};

//@desc    Student updating profile
//@route    UPDATE /api/v1/students/update
//@access   Private Student only

exports.studentUpdateProfileController =  async(req, res) => {
  try {
		const result = await studentUpdateProfileService(req.body,req.userAuth.id)
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}
  
};

//@desc     Admin updating Students eg: Assigning classes....
//@route    UPDATE /api/v1/students/:studentID/update/admin
//@access   Private Admin only

exports.adminUpdateStudentController =  async(req, res) => {
  try {
		const result = await adminUpdateStudentService(req.body,req.params.studentId)
		responseStatus(res,200,'success',result)
	} catch (error) {
		responseStatus(res,400,'failed',error.message)
	}
  
};