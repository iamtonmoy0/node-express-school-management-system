// Import necessary models
const AcademicYear = require("../../models/Academic/academicYear.model");
// Import responseStatus handler
const responseStatus = require("../../handlers/responseStatus.handler");

/**
 * Create academic years service.
 *
 * @param {Object} data - The data containing information about the academic year.
 * @param {string} data.name - The name of the academic year.
 * @param {string} data.fromYear - The starting year of the academic year.
 * @param {string} data.toYear - The ending year of the academic year.
 * @param {string} userId - The ID of the user creating the academic year.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createAcademicYearService = async (data, userId) => {
  const { name, fromYear, toYear } = data;

  // Check if the academic year already exists
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    return responseStatus(res, 402, "failed", "Academic year already exists");
  }

  // Create the academic year
  const academicYearCreated = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: userId,
  });

  // Push the academic year into the admin's academicYears array
  const admin = await Admin.findById(userId);
  admin.academicYears.push(academicYearCreated._id);
  await admin.save();

  // Send the response
  return responseStatus(res, 201, "success", academicYearCreated);
};

/**
 * Get all academic years service.
 *
 * @returns {Array} - An array of all academic years.
 */
exports.getAcademicYearsService = async () => {
  return await AcademicYear.find();
};

/**
 * Get academic year by ID service.
 *
 * @param {string} id - The ID of the academic year.
 * @returns {Object} - The academic year object.
 */
exports.getAcademicYearService = async (id) => {
  return await AcademicYear.findById(id);
};

/**
 * Update academic year service.
 *
 * @param {Object} data - The data containing updated information about the academic year.
 * @param {string} data.name - The updated name of the academic year.
 * @param {string} data.fromYear - The updated starting year of the academic year.
 * @param {string} data.toYear - The updated ending year of the academic year.
 * @param {string} academicId - The ID of the academic year to be updated.
 * @param {string} userId - The ID of the user updating the academic year.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateAcademicYearService = async (data, academicId, userId) => {
  const { name, fromYear, toYear } = data;

  // Check if the updated name already exists
  const createAcademicYearFound = await AcademicYear.findOne({ name });
  if (createAcademicYearFound) {
    return responseStatus(res, 402, "failed", "Academic year already exists");
  }

  // Update the academic year
  const academicYear = await AcademicYear.findByIdAndUpdate(
    academicId,
    { name, fromYear, toYear, createdBy: userId },
    { new: true }
  );

  // Send the response
  return responseStatus(res, 201, "success", academicYear);
};

/**
 * Delete academic year service.
 *
 * @param {string} id - The ID of the academic year to be deleted.
 * @returns {Object} - The deleted academic year object.
 */
exports.deleteAcademicYearService = async (id) => {
  return await AcademicYear.findByIdAndDelete(id);
};
