const verifyToken = require("../utils/verifyToken");

const isLoggedIn = (req, res, next) => {
  // get token from header
  const authorization = req.headers.authorization;
  const [scheme, token] = authorization?.split(" ") || [];
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ status: "failed", message: "Bearer token required" });
  }
  // verify token
  const verify = verifyToken(token);
  if (verify) {
    req.userAuth = verify;
    next();
  } else {
    res.status(401).json({
      status: "failed",
      message: "Invalid/expired token",
    });
  }
  //save user to user.obj
};
module.exports = isLoggedIn;
