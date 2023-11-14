const responseStatus = require("../handlers/responseStatus.handler");
const Admin = require("../models/Staff/admin.model");

const isAdmin = async (req, res, next) => {
  const userId = req.userAuth.id;
  const admin = await Admin.findById(userId);
  if (admin.role === "admin") {
    next();
  } else {
    responseStatus(res, 403, "failed", "Access Denied.admin only route!");
  }
};
module.exports = isAdmin;
