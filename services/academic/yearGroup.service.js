
const YearGroup = require("../../models/Academic/yearGroup.model");
const Admin = require("../../models/Staff/admin.model");

// create YearGroup Service
exports.createYearGroupService=async(data,userId)=>{
	const { name, academicYear } = data;
	//check if exists
	const YearGroupFound = await YearGroup.findOne({ name });
	if (YearGroupFound) {
	  return responseStatus(res, 402, "failed", "Year Group  already exists");
	}
	//create
	const YearGroupCreated = await YearGroup.create({
	  name,
	  academicYear,
	  createdBy: userId,
	});
// push object id to admin
const admin = await Admin.findById(userId);
if(!admin) return responseStatus(res, 401, "failed", "Admin does not exist"); 
admin.yearGroups.push(YearGroupCreated);
await admin.save(); //saving the  data
	return responseStatus(res, 200, "success",  YearGroupCreated);

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
	 return responseStatus(res, 402, "failed", "Year Group already exists");
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
return responseStatus(res, 200, "success", YearGroups);
}


// delete YearGroup data
exports.deleteYearGroupService=async(id)=>{
	return await YearGroup.findByIdAndDelete(id);
}