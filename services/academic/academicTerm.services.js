const AcademicTerm = require("../../models/Academic/academicTerm.model");

const Admin = require("../../models/Staff/admin.model");

// create academic terms 
exports.createAcademicTermServices = async ( data,userId) => {
	const { name ,description ,duration } = data;
	//check if exists
	const academicTerm = await AcademicTerm.findOne({ name });
	if (academicTerm) {
	  return "Academic term already exists";
	}
	//create
	const academicTermCreated = await AcademicTerm.create({
	  name,
	  description,
	  duration,
	  createdBy:userId
	});
	//push academic into admin
	const admin = await Admin.findById(userId);
	admin.academicTerms.push(academicTermCreated._id);
	await admin.save();
	return academicTermCreated;
	
  };
//   get all academic terms
  exports.getAcademicTermsServices = async ( ) => {
	return await AcademicTerm.find();
  };
  
//   get academic term by id
  exports.getAcademicTermServices = async (id ) => {
 return await AcademicTerm.findById(id);
  };
//  update academic term
  exports.updateAcademicTermServices = async (data,academicId,userId) => {
	const { name ,description, duration } = data;
	//check name exists
	const createAcademicTermFound = await AcademicTerm.findOne({ name });
	if (createAcademicTermFound) {
	  return "Academic term already exists";
	}
	const academicTerm = await AcademicTerm.findByIdAndUpdate(academicId,{name,description,duration,createdBy: userId},
	  {new: true}
	);
	return academicTerm;
  
  };
// delete academic term
  exports.deleteAcademicTermServices = async (id) => {
	return await AcademicTerm.findByIdAndDelete(id);
  };