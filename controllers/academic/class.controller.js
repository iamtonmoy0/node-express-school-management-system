const responseStatus = require("../../handlers/responseStatus.handler");
const { createClassLevelService, getAllClassesService, getClassLevelsService, deleteClassLevelService, updateClassLevelService } = require("../../services/academic/class.service");


//@desc  Create Class Level
//@route POST /api/v1/class-levels
//@access  Private
exports.createClassLevelController = async (req, res) => {
try {
	const result = await createClassLevelService(req.body,req.userAuth.id)
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
		const result = await getClassLevelsService(req.params.id)
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
	const result = await  updateClassLevelService(req.body,req.params.id,req.userAuth.id);
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
		const result = await deleteClassLevelService(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};