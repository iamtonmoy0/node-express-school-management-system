const AcademicYear = require("../../models/Academic/academicYear.model");

const Admin = require("../../models/Staff/Admin");

// create academic years 
exports.createAcademicYearServices = async ( data,userId) => {
	const { name ,fromYear ,toYear } = data;
	//check if exists
	const academicYear = await AcademicYear.findOne({ name });
	if (academicYear) {
	  return "Academic year already exists";
	}
	//create
	const academicYearCreated = await AcademicYear.create({
	  name,
	  fromYear,
	  toYear,
	  createdBy:userId
	});
	//push academic into admin
	const admin = await Admin.findById(userId);
	admin.academicYears.push(academicYearCreated._id);
	await admin.save();
	return academicYearCreated;
	
  };
//   get all academic years
  exports.getAcademicYearsServices = async ( ) => {
	return await AcademicYear.find();
  };
  
//   get academic year by id
  exports.getAcademicYearServices = async (id ) => {
 return await AcademicYear.findById(id);
  };
//  update academic year
  exports.updateAcademicYearServices = async (data,academicId,userId) => {
	const { name ,fromYear, toYear } = data;
	//check name exists
	const createAcademicYearFound = await AcademicYear.findOne({ name });
	if (createAcademicYearFound) {
	  return "Academic year already exists";
	}
	const academicYear = await AcademicYear.findByIdAndUpdate(academicId,{name,fromYear,toYear,createdBy: userId},
	  {new: true}
	);
	return academicYear;
  
  };
// delete academic year
  exports.deleteAcademicYearServices = async (id) => {
	return await AcademicYear.findByIdAndDelete(id);
  };