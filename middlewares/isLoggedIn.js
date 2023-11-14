const verifyToken = require("../utils/verifyToken");

const isLoggedIn = (req, res, next) => {
  // get token from header
  const headerObj = req.headers;
  const token = headerObj.authorization.split(" ")[1];
  // verify token
  const verify = verifyToken(token);
  if (verify) {
    req.userAuth = verify;
    next();
  } else {
    res.status(400).json({
      status: "failed",
      message: "Invalid/expired token",
    });
  }
  //save user to user.obj
};
module.exports = isLoggedIn;
