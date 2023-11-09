const responseStatus = require("../../handlers/responseStatus.handler");
const { createProgramService, getAllProgramsService, getProgramsService, updateProgramService, deleteProgramService } = require("../../services/academic/program.service");


//@desc  Create Program 
//@route POST /api/v1/programs
//@access  Private
exports.createProgramController = async (req, res) => {
try {
	const result = await createProgramService(req.body,req.userAuth.id)
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc  get all programs
//@route GET /api/v1/programs
//@access  Private
exports.getProgramsController = async (req, res) => {
	try {
		const result = await getAllProgramsService()
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}

};

//@desc  get single Program 
//@route GET /api/v1/programs/:id
//@access  Private
exports.getProgramController = async (req, res) => {
	try {
		const result = await getProgramsService(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
 
};

//@desc   Update  Program 
//@route  Patch /api/v1/programs/:id
//@access  Private

exports.updateProgramController = async (req, res) => {
  try {
	const result = await  updateProgramService(req.body,req.params.id,req.userAuth.id);
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc   Delete  class level
//@route  Delete /api/v1/programs/:id
//@access  Private
exports.deleteProgramController = async (req, res) => {
	try {
		const result = await deleteProgramService(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};