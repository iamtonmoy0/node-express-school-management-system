const responseStatus = require("../handlers/responseStatus.handler");
const Teacher = require("../models/Staff/teachers.model");
const verifyToken = require("../utils/verifyToken");

const isTeacherLogin = async(req,res,next)=>{
	// get token from headers
	const headerObj = req.headers;
	const token = headerObj.authorization.split(' ')[1];
	// verify token
	const verifiedToken = verifyToken(token);
	if(verifiedToken ){
		const teacher = await Teacher.findById(verifiedToken.id).select("name email role")
		req.userAuth = teacher;
		next()

	} else{
		responseStatus(res,401,"failed",'Expired/invalid token')
	}

}
module.exports=isTeacherLogin;