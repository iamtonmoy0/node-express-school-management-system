// Import necessary modules
const {
  hashPassword,
  isPassMatched,
} = require("../../handlers/passHash.handler");
const responseStatus = require("../../handlers/responseStatus.handler");
const Admin = require("../../models/Staff/admin.model");
const generateToken = require("../../utils/tokenGenerator");
// const verifyToken = require("../../utils/verifyToken");

/**
 * Register admin service.
 *
 * @param {Object} data - The data containing information about the admin.
 * @param {string} data.name - The name of the admin.
 * @param {string} data.email - The email of the admin.
 * @param {string} data.password - The password of the admin.
 * @returns {Object} - The created admin object or an error message.
 */
exports.registerAdminService = async (data, res) => {
  const { name, email, password } = data;

  // Check if admin with the same email already exists
  const isAdminExist = await Admin.findOne({ email });
  if (isAdminExist)
    return responseStatus(res, 401, "failed", "Email Already in use");

  // Create a new admin
  await Admin.create({
    name,
    email,
    password: hashPassword(password),
  });
  return responseStatus(res, 201, "success", "Registration Successful");
};

/**
 * Login admin service.
 *
 * @param {Object} data - The data containing login information.
 * @param {string} data.email - The email of the admin.
 * @param {string} data.password - The password of the admin.
 * @returns {Object} - The admin user, token, and verification status or an error message.
 */
exports.loginAdminService = async (data, res) => {
  const { email, password } = data;
  // Find the admin user by email
  const user = await Admin.findOne({ email });
  if (!user)
    return responseStatus(res, 405, "failed", "Invalid login credentials");

  // Check if the provided password is valid
  const isPassValid = await isPassMatched(password, user.password);

  if (isPassValid) {
    // Generate a token and verify it
    const token = generateToken(user._id);
    // const verify = verifyToken(token);
    const result = {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        academicTerms: user.academicTerms,
        programs: user.programs,
        academicYears: user.academicYears,
        classLevels: user.classLevels,
        students: user.students,
      },
      token,
    };
    // Return user, token, and verification status
    return responseStatus(res, 200, "success", result);
  } else {
    return responseStatus(res, 405, "failed", "Invalid login credentials");
  }
};

/**
 * Get all admins service.
 *
 * @returns {Array} - An array of all admin users.
 */
exports.getAdminsService = async () => {
  return Admin.find({});
};

/**
 * Get single admin profile service.
 *
 * @param {string} id - The ID of the admin user.
 * @returns {Object} - The admin user profile or an error message.
 */
exports.getSingleProfileService = async (id, res) => {
  const user = await Admin.findOne({ _id: id }).select(
    "-password -createdAt -updatedAt"
  );

  if (!user) {
    return responseStatus(res, 201, "failed", "Admin doesn't exist ");
  } else {
    return responseStatus(res, 201, "success", user);
  }
};

/**
 * Update single admin service.
 *
 * @param {string} id - The ID of the admin user to be updated.
 * @param {Object} data - The data containing updated information about the admin.
 * @param {string} data.email - The updated email of the admin.
 * @param {string} data.name - The updated name of the admin.
 * @param {string} data.password - The updated password of the admin.
 * @returns {Object} - The updated admin object or an error message.
 */
exports.updateAdminService = async (id, data, res) => {
  const { email, name, password } = data;

  // Check if the updated email already exists
  const emailTaken = await Admin.findOne({ email });
  if (emailTaken) {
    return "Email is already in use";
  }

  if (password) {
    // If password is provided, update it
    const updateResult = await Admin.findByIdAndUpdate(
      id,
      { name, email, password: await hashPassword(password) },
      { new: true }
    ).select("-password -createdAt -updatedAt");
    return responseStatus(res, 201, "success", updateResult);
  } else {
    // If no password provided, update only email and name
    const findAdminAndUpdate = await Admin.findByIdAndUpdate(
      id,
      { email, name },
      { new: true }
    ).select("-password -createdAt -updatedAt");
    return responseStatus(res, 201, "success", findAdminAndUpdate);
  }
};
