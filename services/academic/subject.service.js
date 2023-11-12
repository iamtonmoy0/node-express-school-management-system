
const Subject = require("../../models/Academic/subject.model");
// const ClassLevel = require("../../models/Academic/class.model");
const Program = require('../../models/Academic/program.model');

// create Subject Service
exports.createSubjectService=async(data,programId,userId)=>{
	const { name, description,academicTerm } = data;
	const programFound = await Program.findById(programId);
	if (!programFound) return responseStatus(res, 402, "failed", "Program not found");
	//check if exists
	const SubjectFound = await Subject.findOne({ name });
	if (SubjectFound) {
	  return responseStatus(res, 402, "failed", "Subject  already exists"); 
	}
	//create
	const SubjectCreated = await Subject.create({
	  name,
	  description,
	  academicTerm,
	  createdBy: userId,
	});
// push object id to program
programFound.subjects.push(SubjectCreated._id);
await programFound.save();

	return responseStatus(res, 200, "success", SubjectCreated); 

}
// get all Subjects
exports.getAllSubjectsService = async () =>{
	return await Subject.find();
}
// get single Subject by id
exports.getSubjectsService=async(id)=>{
	return await Subject.findById(id);
}
// update Subject data
exports.updateSubjectService=async(data,id,userId)=>{
	const { name, description,academicTerm } = data;
	//check name exists
	const classFound = await Subject.findOne({ name });
	if (classFound) {
	 return  responseStatus(res, 402, "failed", "Subject already exists");
	}
	const Subjects = await Subject.findByIdAndUpdate(
	  id,
	  {
		name,
		description,
		academicTerm,
		createdBy: userId,
	  },
	  {
		new: true,
	  }
	);	
return responseStatus(res, 200, "success", Subjects); 
}


// delete Subject data
exports.deleteSubjectService=async(id)=>{
	return await Subject.findByIdAndDelete(id);
}