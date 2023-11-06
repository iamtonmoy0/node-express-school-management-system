const responseStatus = require("../../handlers/responseStatus.handler");
const { getAllYearGroupsService, createYearGroupServices, getYearGroupsServices, deleteYearGroupServices, updateYearGroupServices } = require("../../services/academic/yearGroup.services");

//@desc  Create YearGroup
//@route POST /api/v1/year-group
//@access  Private
exports.createYearGroupController = async (req, res) => {
try {
	const result = await createYearGroupServices(req.body,req.userAuth.id)
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc  get all YearGroups
//@route GET /api/v1/year-group
//@access  Private
exports.getYearGroupsController = async (req, res) => {
	try {
		const result = await getAllYearGroupsService()
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}

};

//@desc  get single YearGroup
//@route GET /api/v1/year-group/:id
//@access  Private
exports.getYearGroupController = async (req, res) => {
	try {
		const result = await getYearGroupsServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
 
};

//@desc   Update  YearGroup
//@route  Patch /api/v1/year-group/:id
//@access  Private

exports.updateYearGroupController = async (req, res) => {
  try {
	const result = await  updateYearGroupServices(req.body,req.params.id,req.userAuth.id);
	responseStatus(res,200,"success",result)
} catch (error) {
	responseStatus(res,400,"failed",error.message)
}
};

//@desc   Delete  YearGroup
//@route  Delete /api/v1/year-group/:id
//@access  Private
exports.deleteYearGroupController = async (req, res) => {
	try {
		const result = await deleteYearGroupServices(req.params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
};