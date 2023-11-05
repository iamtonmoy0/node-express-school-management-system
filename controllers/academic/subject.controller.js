const responseStatus = require("../../handlers/responseStatus.handler");
const { createSubjectServices, getAllSubjectsService, getSubjectsServices, deleteSubjectServices, updateSubjectServices } = require("../../services/academic/subject.services");

//@desc  Create Subject
//@route POST /api/v1/subject-create/:programId
//@access  Private
exports.createSubjectController = async (req, res) => {
try {
	const result = await createSubjectServices(req.body,req.params.id,req.userAuth.id)
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc  get all Subjects
//@route GET /api/v1/subject
//@access  Private
exports.getSubjectsController = async (req, res) => {
	try {
		const result = await getAllSubjectsService()
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}

};

//@desc  get single Subject
//@route GET /api/v1/subject/:id
//@access  Private
exports.getSubjectController = async (req, res) => {
	try {
		const result = await getSubjectsServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
 
};

//@desc   Update  Subject
//@route  Patch /api/v1/subject/:id
//@access  Private

exports.updateSubjectController = async (req, res) => {
  try {
	const result = await  updateSubjectServices(req.body,req.params.id,req.userAuth.id);
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc   Delete  Subject
//@route  Delete /api/v1/subject/:id
//@access  Private
exports.deleteSubjectController = async (req, res) => {
	try {
		const result = await deleteSubjectServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};