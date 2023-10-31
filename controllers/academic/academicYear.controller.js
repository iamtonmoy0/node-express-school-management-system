const responseStatus = require("../../handlers/responseStatus.handler");
const { createAcademicYearServices, getAcademicYearsServices, getAcademicYearServices, updateAcademicYearServices, deleteAcademicYearServices } = require("../../services/academic/academicYear.services");


//@desc Create Academic Year
//@route POST /api/v1/academic-years
//@access  Private
exports.createAcademicYearController = async (req, res) => {
  try {
	const result = await createAcademicYearServices(req.body,req.userAuth.id)
	responseStatus(res,201,"success",result)
  } catch (error) {
	responseStatus(res,400,"failed",error.message)
  }
};

//@desc  get all Academic Years
//@route GET /api/v1/academic-years
//@access  Private
exports.getAcademicYearsController = async (req, res) => {
	try {
		const result = await getAcademicYearsServices()
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc  get single Academic Year
//@route GET /api/v1/academic-years/:id
//@access  Private
exports.getAcademicYearController = async (req, res) => {
	try {
		const result = await  getAcademicYearServices(req.params.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@access  Private
exports.updateAcademicYearController = async (req, res) => {
	try {
		const result = await updateAcademicYearServices(req.body,req.params.id,req.userAuth.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc   Update  Academic Year
//@route  PUT /api/v1/academic-years/:id
//@access  Private
exports.deleteAcademicYearController = async (req, res) => {
	try {
		const result = await deleteAcademicYearServices(req.params.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};