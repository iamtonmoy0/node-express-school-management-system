const responseStatus = require("../../handlers/responseStatus.handler");
const { createSubjectService, getAllSubjectsService, getSubjectsService, deleteSubjectService, updateSubjectService } = require("../../services/academic/subject.service");

//@desc  Create Subject
//@route POST /api/v1/create-subject/:programId
//@access  Private
exports.createSubjectController = async (req, res) => {
try {
	const result = await createSubjectService(req.body,req.params.programId,req.userAuth.id)
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
		const result = await getSubjectsService(req.params.id)
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
	const result = await  updateSubjectService(req.body,req.params.id,req.userAuth.id);
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
		const result = await deleteSubjectService(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};