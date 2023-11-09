const responseStatus = require("../../handlers/responseStatus.handler");
const Exam = require("../../models/Academic/exams.model")
const Questions = require("../../models/Academic/questions.model")
// create questions 
exports.createQuestionsService = async(data,examId,teacherId,res)=>{
	const {
		question,
		optionA,
		optionB,
		optionC,
		optionD,
		correctAnswer,
	} = data;
	// finding the exam
	const exam = await Exam.findById(examId)
	// if exam not exist
	if(!exam) return responseStatus(res,404,"failed","Exam not found")
// finding duplicate question
const isQuestion = await Questions.findOne({question})
if(!isQuestion) return responseStatus(res,405,"failed" ,"This Question already exist")
	// create exam
	const createQuestions = await Questions.create({
		question,
		optionA,
		optionB,
		optionC,
		optionD,
		correctAnswer,
		createdBy: teacherId
	})
	// if question is created successfully
	exam.questions.push(createQuestions._id)
	await exam.save()
	return responseStatus(res,201,"success",createQuestions)
}
// get all questions
exports.getAllQuestionsService = async () =>{
return await Questions.find();
}
// get questions by id
exports.getQuestionsByIdService = async (questionId) => {
	return await Questions.findById(questionId)
}
// update questions 
exports.updateQuestionsService = async(data,questionId,userID,res)=> {
	const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    data;
  //check name exists
  const questionFound = await Questions.findOne({ question });
  if (questionFound) return responseStatus(res,401,"failed","Question already exists")
  const questionCreate = await Questions.findByIdAndUpdate(
    questionId,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: userId,
    },
    {
      new: true,
    }
  );
  return responseStatus(res,201,"success",questionCreate)

}