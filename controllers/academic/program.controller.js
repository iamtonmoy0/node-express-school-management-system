const responseStatus = require("../../handlers/responseStatus.handler");
const { createProgramServices, getAllProgramsService, getProgramsServices, updateProgramServices, deleteProgramServices } = require("../../services/academic/program.services");


//@desc  Create Program 
//@route POST /api/v1/programs
//@access  Private
exports.createProgramController = async (req, res) => {
try {
	const result = await createProgramServices(req.body,req.userAuth.id)
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
		const result = await getProgramsServices(req.params.id)
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
	const result = await  updateProgramServices(req.body,req.params.id,req.userAuth.id);
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
		const result = await deleteProgramServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};