const responseStatus = require("../../handlers/responseStatus.handler")
const { createExamService } = require("../../services/academic/questions.services")
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
