const { hashPassword } = require('../../handlers/passHash.handler');
const Teacher = require('../../models/Staff/teachers.model');
const Admin = require('../../models/Staff/admin.model');

// create teacher services
exports.createTeacherServices = async (data,adminId) => {
	const {name,email,password} = data;
	console.log(data)
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