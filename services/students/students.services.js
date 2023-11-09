const { hashPassword, isPassMatched } = require('../../handlers/passHash.handler');
const Student = require('../../models/Students/students.model');
const generateToken = require('../../utils/tokenGenerator');
// admin register student
exports.adminRegisterStudentService=async(data)=>{

	const { name, email, password } = data;
	//check if teacher already exists
	const student = await Student.findOne({ email });
	if (student) return "Student already employed";
	
	//Hash password
	const hashedPassword = await hashPassword(password);
	// create
	const studentRegistered = await Student.create({
	  name,
	  email,
	  password: hashedPassword,
	});
return studentRegistered;
}
// student login services
exports.studentLoginService = async(data)=>{

	const { email, password } = data;
	//find the  user
	const student = await Student.findOne({ email }).select("-password ");
	if (!student) return  "Invalid login credentials";
	
	//verify the password
	const isMatched = await isPassMatched(password, student?.password);
	if (!isMatched) return  "Invalid login credentials";
	
	 const data = {student,token:generateToken(student._id)}
	 return data; 
	
}
// get student profile
exports.getStudentsProfileService = async(id)=>{
	const student = await Student.findById(id).select(
		"-password -createdAt -updatedAt"
	  );
	  if (!student) return "Student not found";
	  return student
}
// get all students by admin
exports.getAllStudentsByAdminService = async()=>{
	return await Student.find();
}
// admin get single student
exports.getStudentByAdminService=async()=>{
	  //find the Student
	  const student = await Student.findById(studentID);
	  if (!student) return "Student not found";
	  return student;
}
// update student info
// student update own profile
exports.studentUpdateProfileService=async(data,userId)=>{
	const { email, password } = data;
  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) return "This email is taken/exist";

  //hash password
  //check if user is updating password

  if (password) {
    //update
    const student = await Student.findByIdAndUpdate(
      userId,
      {
        email,
        password: await hashPassword(password),
      },
      {
        new: true,
        runValidators: true,
      }
    );
  return student;
  } else {
    //update
    const student = await Student.findByIdAndUpdate(
      userId,
      {
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  return student;
  }
}
	 
// admin update Student service
exports.adminUpdateStudentService=async(data,studentId)=>{
	const { classLevels, academicYear, program, name, email, prefectName } =
    data;

  //find the student by id
  const studentFound = await Student.findById(studentId);
  if (!studentFound) return "Student not found"
  //update
  const studentUpdated = await Student.findByIdAndUpdate(
    studentId,
    {
      $set: {
        name,
        email,
        academicYear,
        program,
        prefectName,
      },
      $addToSet: {
        classLevels,
      },
    },
    {
      new: true,
    }
  );
  //send response
return studentUpdated
}
