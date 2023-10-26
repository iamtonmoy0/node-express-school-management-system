const Admin = require('../../models/Staff/admin.model');
const generateToken = require('../../utils/tokenGenerator');
const verifyToken = require('../../utils/verifyToken');

// register admin services
exports.registerAdminServices=async(data)=>{
	const {name,email,password} = data;
	const isAdminExist = await Admin.findOne({email});
	if(isAdminExist) return "Email already in use! please sign in"
	const result = await Admin.create({name,email,password})
	return result;

}
// login admin
exports.loginAdminServices = async(data)=>{
	const {email,password} = data;
	
	const user = await Admin.findOne({email})
	if(!user) return "Invalid login credentials"

	const isPassValid = await user.verifyPassword(password)
	if(isPassValid){
		const token = generateToken(user._id)
		const verify= verifyToken(token)
		return {user,token,verify}
	}else{
		return "Invalid login credentials";	
	}

}

// get all admins
exports.getAdminsServices = async()=>{
	return Admin.find({})
} 