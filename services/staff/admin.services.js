const Admin = require('../../models/Staff/admin.model');

// register admin services
exports.registerAdminServices=async(data)=>{
	const {name,email,password} = data;
	const isAdminExist = await Admin.findOne({email});
	if(isAdminExist) return "Email already exist!"
	const result = await Admin.create({name,email,password})
	return result;

}
// login admin
exports.loginAdminServices = async(data)=>{

}

// get all admins
exports.getAdminsServices = async()=>{
	return Admin.find({})
}