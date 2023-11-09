const Teacher = require('../../models/Staff/teachers.model')
const Exams = require('../../models/Academic/exams.model')
// create exam by teacher
exports.createExamService = async(data,teacherId)=>{
const {name,description,subject,program,passMark,totalMark,academicTerm,duration,examDate,examTime,createdBy} = data;
// finding the teacher
const teacherExist = await Teacher.findById(teacherId)
if(!teacherExist) return  "Teacher not found !"
// finding the exam exist
const examExist = await Exams.findOne({name})
if(examExist) return  "Exam Already Exist"
// create exam
 const examCreate = await Exams.create({
	name,
	description,
	subject,
	program,
	passMark,
	totalMark,
	academicTerm,
	duration,
	examDate,
	examTime,
	createdBy:teacherExist._id
 });
//  save exam id to teacher collection
teacherExist.examsCreated.push(examCreate._id)
await teacherExist.save();
return examCreate;

}
// get all exams
exports.getAllExamService= async ()=>{
	return await Exams.find();
};
// get exam by id
exports.getExamByIdService=async(id)=>{
	return await Exams.findById(id)
}
// update exams 
exports.updateExamService=async(data,examId)=>{
	const {
		name,
		description,
		subject,
		program,
		academicTerm,
		duration,
		examDate,
		examTime,
		examType,
		createdBy,
		academicYear,
		classLevel,
	  } = data;
	  //check name exists
	  const examFound = await Exams.findOne({ name });
	  if (examFound) {
		return "Exam already exists"
	  }
	
	  const examUpdated = await Exams.findByIdAndUpdate(
		examId,
		{
		  name,
		  description,
		  subject,
		  program,
		  academicTerm,
		  duration,
		  examDate,
		  examTime,
		  examType,
		  createdBy,
		  academicYear,
		  classLevel,
		  createdBy: req.userAuth._id,
		},
		{
		  new: true,
		}
	  );
	  return examUpdated;
}