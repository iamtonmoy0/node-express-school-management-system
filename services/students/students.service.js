const { hashPassword, isPassMatched } = require('../../handlers/passHash.handler');
const Student = require('../../models/Students/students.model');
const generateToken = require('../../utils/tokenGenerator');
// admin register student
exports.adminRegisterStudentService=async(data, res)=>{

	const { name, email, password } = data;
	//check if teacher already exists
	const student = await Student.findOne({ email });
	if (student) return responseStatus(res,402,"failed","Student already enrolled");
	
	//Hash password
	const hashedPassword = await hashPassword(password);
	// create
	const studentRegistered = await Student.create({
	  name,
	  email,
	  password: hashedPassword,
	});
return  responseStatus(res,200,"success",studentRegistered);;
}
// student login Service
exports.studentLoginService = async(data, res)=>{

	const { email, password } = data;
	//find the  user
	const student = await Student.findOne({ email }).select("-password ");
	if (!student) return responseStatus(res,402,"failed","Invalid login credentials"); 
	
	//verify the password
	const isMatched = await isPassMatched(password, student?.password);
	if (!isMatched) return responseStatus(res,401,"failed","Invalid login credentials"); 
	
	 const data = {student,token:generateToken(student._id)}
	 return responseStatus(res,200,"success", data);	
}

// get student profile
exports.getStudentsProfileService = async(id , res)=>{
	const student = await Student.findById(id).select(
		"-password -createdAt -updatedAt"
	  );
	  if (!student) return responseStatus(res,402,"failed","Student not found"); 
	  return responseStatus(res,200,'success',student)
}
// get all students by admin
exports.getAllStudentsByAdminService = async()=>{
	return await Student.find();
}
// admin get single student
exports.getStudentByAdminService=async(studentID, res)=>{
	  const student = await Student.findById(studentID);
	  if (!student) return responseStatus(res,402,'failed',"Student not found");
	  return responseStatus(res,200,'success',student) 
}

// update student info
// student update own profile
exports.studentUpdateProfileService=async(data,userId, res)=>{
	const { email, password } = data;
  //if email is taken
  const emailExist = await Student.findOne({ email });
  if (emailExist) return responseStatus(res,402,'failed', "This email is taken/exist");

  
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
  return responseStatus(res,200,'success', student);
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
  return  responseStatus(res,200,'success', student);
  }
}
	 
// admin update Student service
exports.adminUpdateStudentService=async(data,studentId,res)=>{
	const { classLevels, academicYear, program, name, email, prefectName } =
    data;

  //find the student by id
  const studentFound = await Student.findById(studentId , res);
  if (!studentFound) return responseStatus(res,402,'failed', "Student not found"); 
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
return responseStatus(res,200,'success', studentUpdated); 
}
