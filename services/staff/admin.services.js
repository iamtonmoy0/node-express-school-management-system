const { hashPassword, isPassMatched } = require('../../handlers/passHash.handler');
const Admin = require('../../models/Staff/admin.model');
const generateToken = require('../../utils/tokenGenerator');
const verifyToken = require('../../utils/verifyToken');

// register admin services
exports.registerAdminServices=async(data)=>{
	const {name,email,password} = data;
	const isAdminExist = await Admin.findOne({email});
	if(isAdminExist) return "Email already in use! please sign in"
	const result = await Admin.create({name,email,password:hashPassword(password)})
	return result;

}
// login admin
exports.loginAdminServices = async(data)=>{
	const {email,password} = data;
	
	const user = await Admin.findOne({email})
	if(!user) return "Invalid login credentials"

	const isPassValid = await isPassMatched(password,user.password);
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
// get single admin profile
exports.getSingleProfileService = async (id)=> {
	const user = await Admin.findOne({_id:id});
	if(!user){
		return "Admin not found"
	}else{
		return user;
	}

}
// update single admin
exports.updateAdminServices=async(id,data)=>{
	const {email,name,password} = data
	const emailTaken = await Admin.findOne({email});
	if(emailTaken){
		return "Email is already in use"
	}
	if(password){
		return await Admin.findByIdAndUpdate(id,{name,email,password:await hashPassword(password)},{new:true})
	}
	else{
		const findAdminAndUpdate = await Admin.findByIdAndUpdate(id,{email,name},{new:true});
		return findAdminAndUpdate;
	}


}