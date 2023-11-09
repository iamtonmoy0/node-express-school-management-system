const Program = require("../../models/Academic/program.model");
const ClassLevel = require("../../models/Academic/class.model");
const Admin = require('../../models/Staff/admin.model');

// create program Service
exports.createProgramService=async(data,userId)=>{
	const { name, description } = data;
	//check if exists
	const programFound = await Program.findOne({ name });
	if (programFound) {
	  return "Program  already exists";
	}
	//create
	const programCreated = await Program.create({
	  name,
	  description,
	  createdBy: userId,
	});
	//push program into admin
	const admin = await Admin.findById(userId);
	admin.programs.push(programCreated._id);
	//save
	await admin.save();
	return programCreated;

}
// get all programs
exports.getAllProgramsService = async () =>{
	return await Program.find();
}
// get single program by id
exports.getProgramsService=async(id)=>{
	return await Program.findById(id);
}
// update program data
exports.updateProgramService=async(data,id,userId)=>{
	const { name, description } = data;
	//check name exists
	const classFound = await ClassLevel.findOne({ name });
	if (classFound) {
	 return "program already exists";
	}
	const programs = await Program.findByIdAndUpdate(
	  id,
	  {
		name,
		description,
		createdBy: userId,
	  },
	  {
		new: true,
	  }
	);	
return programs;
}


// delete program data
exports.deleteProgramService=async(id)=>{
	return await Program.findByIdAndDelete(id);
}