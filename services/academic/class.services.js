const ClassLevel = require("../../models/Academic/class.model");
const Admin = require('../../models/Staff/admin.model');

// create class services
exports.createClassLevelServices=async(data,userId)=>{
	const { name, description } = data;
	//check if exists
	const classFound = await ClassLevel.findOne({ name });
	if (classFound) {
	  return "Class  already exists";
	}
	//create
	const classCreated = await ClassLevel.create({
	  name,
	  description,
	  createdBy: userId,
	});
	//push class into admin
	const admin = await Admin.findById(req.userAuth._id);
	admin.classLevels.push(classCreated._id);
	//save
	await admin.save();
	return classCreated;

}
// get all classes
exports.getAllClassesService = async () =>{
	return await ClassLevel.find();
}
// get single class by id
exports.getClassLevelsServices=async(id)=>{
	return await ClassLevel.findById(id);
}
// update class data
exports.updateClassLevelServices=async(data,id,userId)=>{
	const { name, description } = data;
	//check name exists
	const classFound = await ClassLevel.findOne({ name });
	if (classFound) {
	 return "Class already exists";
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

}


// delete class data
exports.deleteClassLevelServices=async(id)=>{
	return await ClassLevel.findByIdAndDelete(id);
}