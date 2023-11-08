const { hashPassword, isPassMatched } = require('../../handlers/passHash.handler');
const Teacher = require('../../models/Staff/teachers.model');
const Admin = require('../../models/Staff/admin.model');
const generateToken = require('../../utils/tokenGenerator');

// create teacher services
exports.createTeacherServices = async (data,adminId) => {
	const {name,email,password} = data;
	// check if teacher already exist
	const existTeacher = await Teacher.findOne({email});
	if(existTeacher) return " Teacher already exist"
	// hashing password
	const hashedPassword = await hashPassword(password);
	// finding admin
	const admin = await Admin.findById(adminId)
	if(!admin) return " Un-Authorized access"
	// create teacher
	const createTeacher = await Teacher.create({
		name,
		email,
		password:hashedPassword,
		createdBy:admin._id
	})
	admin.teachers.push(createTeacher._id)
	await admin.save();
	return createTeacher;
}
// teacher log in
exports.teacherLoginService = async(data)=>{
const {email,password}=data;
// checking if the teacher exist
const teacherFound=await Teacher.findOne({email});
if(!teacherFound) return "Invalid Log In credentials"
// checking the password
const isMatched = await isPassMatched(password,teacherFound?.password);
if(!isMatched) return "Invalid Log In credentials"

const response = {teacher:teacherFound,token:generateToken(teacherFound._id)} 

return response;
}
// get all teachers
exports.getAllTeachersService = async ()=>{
	return await Teacher.find()
}
// get teacher profile 
exports.getTeacherProfileService = async (teacherId)=>{
	return await Teacher.findById(teacherId).select("-createdAt -updatedAt -password")
}
// update teacher profile 
exports.updateTeacherProfileService = async (data,teacherId)=>{
	const {name,email,password} = data;
	// checking  is email exist
	const emailExist = await Teacher.findOne({email});
	if(emailExist ) return 'Email already used';
	if(password){
		return await Teacher.findByIdAndUpdate(teacherId,{
			name,
			password:await hashPassword(password),
			email,
		},{new:true})
	}else{
		return await Teacher.findByIdAndUpdate(teacherId,{
			name,
			email,
			},{new:true})
	}
}

	
	
