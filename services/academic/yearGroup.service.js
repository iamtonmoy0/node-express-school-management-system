
const YearGroup = require("../../models/Academic/yearGroup.model");
const Admin = require("../../models/Staff/admin.model");

// create YearGroup Service
exports.createYearGroupService=async(data,userId)=>{
	const { name, academicYear } = data;
	//check if exists
	const YearGroupFound = await YearGroup.findOne({ name });
	if (YearGroupFound) {
	  return "Year Group  already exists";
	}
	//create
	const YearGroupCreated = await YearGroup.create({
	  name,
	  academicYear,
	  createdBy: userId,
	});
// push object id to admin
const admin = await Admin.findById(userId);
if(!admin) return "Admin does not exist"
admin.yearGroups.push(YearGroupCreated);
await admin.save(); //saving the  data
	return YearGroupCreated;

}
// get all YearGroups
exports.getAllYearGroupsService = async () =>{
	return await YearGroup.find();
}
// get single Year Group by id
exports.getYearGroupsService=async(id)=>{
	return await YearGroup.findById(id);
}
// update YearGroup data
exports.updateYearGroupService=async(data,id,userId)=>{
	const { name, academicYear } = data;
	//check name exists
	const classFound = await YearGroup.findOne({ name });
	if (classFound) {
	 return "Year Group already exists";
	}
	const YearGroups = await YearGroup.findByIdAndUpdate(
	  id,
	  {
		name,
		academicYear,
		createdBy: userId,
	  },
	  {
		new: true,
	  }
	);	
return YearGroups;
}


// delete YearGroup data
exports.deleteYearGroupService=async(id)=>{
	return await YearGroup.findByIdAndDelete(id);
}