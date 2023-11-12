const ClassLevel = require("../../models/Academic/class.model");
const Admin = require('../../models/Staff/admin.model');

// create class Service
exports.createClassLevelService=async(data,userId)=>{
	const { name, description } = data;
	//check if exists
	const classFound = await ClassLevel.findOne({ name });
	if (classFound) {
	  return responseStatus(res, 400, "failed", "Class  already exists"); 
	}
	//create
	const classCreated = await ClassLevel.create({
	  name,
	  description,
	  createdBy: userId,
	});
	//push class into admin
	const admin = await Admin.findById(userId);
	admin.classLevels.push(classCreated._id);
	//save
	await admin.save();
	return  responseStatus(res, 200, "success", classCreated);

}
// get all classes
exports.getAllClassesService = async () =>{
	return await ClassLevel.find();
}
// get single class by id
exports.getClassLevelsService=async(id)=>{
	return await ClassLevel.findById(id);
}
// update class data
exports.updateClassLevelService=async(data,id,userId)=>{
	const { name, description } = data;
	//check name exists
	const classFound = await ClassLevel.findOne({ name });
	if (classFound) {
	 return responseStatus(res, 400, "failed", "Class already exists");
	}
	const classLevel = await ClassLevel.findByIdAndUpdate(
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
	return responseStatus(res, 200, "success",  classLevel);

}


// delete class data
exports.deleteClassLevelService=async(id)=>{
	return await ClassLevel.findByIdAndDelete(id);
}