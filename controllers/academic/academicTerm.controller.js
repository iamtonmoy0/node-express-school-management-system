const responseStatus = require("../../handlers/responseStatus.handler");
const { createAcademicTermServices, getAcademicTermsServices, getAcademicTermServices, updateAcademicTermServices, deleteAcademicTermServices } = require("../../services/academic/academicTerm.services");

//@desc Create Academic Term
//@route POST /api/v1/academic-Terms
//@access  Private
exports.createAcademicTermController = async (req, res) => {
  try {
	const result = await createAcademicTermServices(req.body,req.userAuth.id)
	responseStatus(res,201,"success",result)
  } catch (error) {
	responseStatus(res,400,"failed",error.message)
  }
};

//@desc  get all Academic Terms
//@route GET /api/v1/academic-Terms
//@access  Private
exports.getAcademicTermsController = async (req, res) => {
	try {
		const result = await getAcademicTermsServices()
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc  get single Academic Term
//@route GET /api/v1/academic-Terms/:id
//@access  Private
exports.getAcademicTermController = async (req, res) => {
	try {
		const result = await  getAcademicTermServices(req.params.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc   Update  Academic Term
//@route  PUT /api/v1/academic-Terms/:id
//@access  Private
exports.updateAcademicTermController = async (req, res) => {
	try {
		const result = await updateAcademicTermServices(req.body,req.params.id,req.userAuth.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};

//@desc   Update  Academic Term
//@route  PUT /api/v1/academic-Terms/:id
//@access  Private
exports.deleteAcademicTermController = async (req, res) => {
	try {
		const result = await deleteAcademicTermServices(req.params.id)
		responseStatus(res,201,"success",result)
	  } catch (error) {
		responseStatus(res,400,"failed",error.message)
	  }
};