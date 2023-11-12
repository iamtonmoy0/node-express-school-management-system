const AcademicTerm = require("../../models/Academic/academicTerm.model");

const Admin = require("../../models/Staff/admin.model");

// create academic terms 
exports.createAcademicTermService = async ( data,userId) => {
	const { name ,description ,duration } = data;
	//check if exists
	const academicTerm = await AcademicTerm.findOne({ name });
	if (academicTerm) {
	  return responseStatus(res, 402, "failed", "Academic term already exists");
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
	return responseStatus(res, 200, "success", academicTermCreated);
	
  };
//   get all academic terms
  exports.getAcademicTermsService = async ( ) => {
	return await AcademicTerm.find();
  };
  
//   get academic term by id
  exports.getAcademicTermService = async (id ) => {
 return await AcademicTerm.findById(id);
  };

//  update academic term
  exports.updateAcademicTermService = async (data,academicId,userId) => {
	const { name ,description, duration } = data;
	//check name exists
	const createAcademicTermFound = await AcademicTerm.findOne({ name });
	if (createAcademicTermFound) {
	  return responseStatus(res, 402, "failed", "Academic term already exists");
	}
	const academicTerm = await AcademicTerm.findByIdAndUpdate(academicId,{name,description,duration,createdBy: userId},
	  {new: true}
	);
	return  responseStatus(res, 201, "success", academicTerm); 
  };
// delete academic term
  exports.deleteAcademicTermService = async (id) => {
	return await AcademicTerm.findByIdAndDelete(id);
  };