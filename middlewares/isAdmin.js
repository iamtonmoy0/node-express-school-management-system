const responseStatus = require("../handlers/responseStatus.handler");
const Admin = require("../models/Staff/admin.model");

const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.userAuth.id);
    if (admin?.role === "admin") return next();
    return responseStatus(res, 403, "failed", "Admin access required");
  } catch (error) {
    return responseStatus(res, 500, "failed", "Unable to verify admin access");
  }
};
module.exports = isAdmin;
