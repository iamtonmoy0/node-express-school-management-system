const responseStatus = require("../../handlers/responseStatus.handler");
const { createClassLevelServices, getAllClassesService, getClassLevelsServices, deleteClassLevelServices, updateClassLevelServices } = require("../../services/academic/class.services");


//@desc  Create Class Level
//@route POST /api/v1/class-levels
//@access  Private
exports.createClassLevelController = async (req, res) => {
try {
	const result = await createClassLevelServices(req.body,req.userAuth.id)
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc  get all class levels
//@route GET /api/v1/class-levels
//@access  Private
exports.getClassLevelsController = async (req, res) => {
	try {
		const result = await getAllClassesService()
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}

};

//@desc  get single Class level
//@route GET /api/v1/class-levels/:id
//@access  Private
exports.getClassLevelController = async (req, res) => {
	try {
		const result = await getClassLevelsServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
 
};

//@desc   Update  Class Level
//@route  Patch /api/v1/class-levels/:id
//@access  Private

exports.updateClassLevelController = async (req, res) => {
  try {
	const result = await  updateClassLevelServices(req.body,req.params.id,req.userAuth.id);
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc   Delete  class level
//@route  Delete /api/v1/class-levels/:id
//@access  Private
exports.deleteClassLevelController = async (req, res) => {
	try {
		const result = await deleteClassLevelServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};