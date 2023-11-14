// Import necessary models
const YearGroup = require("../../models/Academic/yearGroup.model");
const Admin = require("../../models/Staff/admin.model");
// Import responseStatus handler
const responseStatus = require("../../handlers/responseStatus.handler");

/**
 * Create YearGroup service.
 *
 * @param {Object} data - The data containing information about the YearGroup.
 * @param {string} data.name - The name of the YearGroup.
 * @param {string} data.academicYear - The academic year associated with the YearGroup.
 * @param {string} userId - The ID of the user creating the YearGroup.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createYearGroupService = async (data, userId) => {
  const { name, academicYear } = data;

  // Check if the YearGroup already exists
  const YearGroupFound = await YearGroup.findOne({ name });
  if (YearGroupFound) {
    return responseStatus(res, 402, "failed", "Year Group already exists");
  }

  // Create the YearGroup
  const YearGroupCreated = await YearGroup.create({
    name,
    academicYear,
    createdBy: userId,
  });

  // Push the object ID to admin
  const admin = await Admin.findById(userId);
  if (!admin) return responseStatus(res, 401, "failed", "Admin does not exist");
  admin.yearGroups.push(YearGroupCreated);
  await admin.save(); // Saving the data

  // Send the response
  return responseStatus(res, 200, "success", YearGroupCreated);
};

/**
 * Get all YearGroups service.
 *
 * @returns {Array} - An array of all YearGroups.
 */
exports.getAllYearGroupsService = async () => {
  return await YearGroup.find();
};

/**
 * Get a single YearGroup by ID service.
 *
 * @param {string} id - The ID of the YearGroup.
 * @returns {Object} - The YearGroup object.
 */
exports.getYearGroupsService = async (id) => {
  return await YearGroup.findById(id);
};

/**
 * Update YearGroup data service.
 *
 * @param {Object} data - The data containing updated information about the YearGroup.
 * @param {string} data.name - The updated name of the YearGroup.
 * @param {string} data.academicYear - The updated academic year associated with the YearGroup.
 * @param {string} id - The ID of the YearGroup to be updated.
 * @param {string} userId - The ID of the user updating the YearGroup.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateYearGroupService = async (data, id, userId) => {
  const { name, academicYear } = data;

  // Check if the updated name already exists
  const classFound = await YearGroup.findOne({ name });
  if (classFound) {
    return responseStatus(res, 402, "failed", "Year Group already exists");
  }

  // Update the YearGroup
  const YearGroups = await YearGroup.findByIdAndUpdate(
    id,
    {
      name,
      academicYear,
      createdBy: userId,
    },
    {
      new: true,
    }
  );

  // Send the response
  return responseStatus(res, 200, "success", YearGroups);
};

/**
 * Delete YearGroup data service.
 *
 * @param {string} id - The ID of the YearGroup to be deleted.
 * @returns {Object} - The deleted YearGroup object.
 */
exports.deleteYearGroupService = async (id) => {
  return await YearGroup.findByIdAndDelete(id);
};
