const isLoggedIn = (req,res,next)=>{
	const isLogin  = req.userAuth
	if(isLogin){
		next();
	}else{
		const err= res.status(401).json({msg:"You must be logged in to view this resource"})
		 next(err);
	}

}
module.exports=isLoggedIn