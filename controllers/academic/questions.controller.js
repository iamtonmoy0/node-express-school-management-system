const responseStatus = require("../../handlers/responseStatus.handler")
const { createExamService, getAllQuestionsService, getQuestionsByIdService } = require("../../services/academic/questions.service")
// @desc Create Question
// @route POST /questions/:examId
//@access Private (Teachers Only)
exports.createQuestionsController = async(req,res)=>{
	try {
		await createExamService(req.body,req.params.examId,req.userAuth.id,res)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
}
//@desc  get all questions
//@route GET /api/v1/questions
//@access  Private - Teacher only
exports.getAllQuestionsController = async(req,res)=>{
	try {
		const result = await getAllQuestionsService()
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
}
//@desc  get all questions
//@route GET /api/v1/questions/:id
//@access  Private - Teacher only
exports.getQuestionByIdController=async(req,res)=>{
	try {
		const result = await getQuestionsByIdService(req,params.id)
		responseStatus(res,200,"success",result)
	} catch (error) {
		responseStatus(res,400,"failed",error.message)
	}
}