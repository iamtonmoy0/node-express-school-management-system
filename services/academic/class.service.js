// Import necessary models
const ClassLevel = require("../../models/Academic/class.model");
const Admin = require('../../models/Staff/admin.model');
// Import responseStatus handler
const responseStatus = require('../../handlers/responseStatus.handler');
/**
 * Create class service.
 *
 * @param {Object} data - The data containing information about the class.
 * @param {string} data.name - The name of the class.
 * @param {string} data.description - The description of the class.
 * @param {string} userId - The ID of the user creating the class.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createClassLevelService = async (data, userId) => {
    const { name, description } = data;

    // Check if the class already exists
    const classFound = await ClassLevel.findOne({ name });
    if (classFound) {
        return responseStatus(res, 400, "failed", "Class already exists");
    }

    // Create the class
    const classCreated = await ClassLevel.create({
        name,
        description,
        createdBy: userId,
    });

    // Push the class into the admin's classLevels array
    const admin = await Admin.findById(userId);
    admin.classLevels.push(classCreated._id);
    // Save the changes
    await admin.save();

    // Send the response
    return responseStatus(res, 200, "success", classCreated);
};

/**
 * Get all classes service.
 *
 * @returns {Array} - An array of all classes.
 */
exports.getAllClassesService = async () => {
    return await ClassLevel.find();
};

/**
 * Get a single class by ID service.
 *
 * @param {string} id - The ID of the class.
 * @returns {Object} - The class object.
 */
exports.getClassLevelsService = async (id) => {
    return await ClassLevel.findById(id);
};

/**
 * Update class data service.
 *
 * @param {Object} data - The data containing updated information about the class.
 * @param {string} data.name - The updated name of the class.
 * @param {string} data.description - The updated description of the class.
 * @param {string} id - The ID of the class to be updated.
 * @param {string} userId - The ID of the user updating the class.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateClassLevelService = async (data, id, userId) => {
    const { name, description } = data;

    // Check if the updated name already exists
    const classFound = await ClassLevel.findOne({ name });
    if (classFound) {
        return responseStatus(res, 400, "failed", "Class already exists");
    }

    // Update the class
    const classLevel = await ClassLevel.findByIdAndUpdate(
        id,
        {
            name,
            description,
            createdBy: userId,
        },
        {
            new: true,
        }
    );

    // Send the response
    return responseStatus(res, 200, "success", classLevel);
};

/**
 * Delete class data service.
 *
 * @param {string} id - The ID of the class to be deleted.
 * @returns {Object} - The deleted class object.
 */
exports.deleteClassLevelService = async (id) => {
    return await ClassLevel.findByIdAndDelete(id);
};
