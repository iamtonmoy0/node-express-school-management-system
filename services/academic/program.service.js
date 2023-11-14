// Import necessary models
const Program = require("../../models/Academic/program.model");
const ClassLevel = require("../../models/Academic/class.model");
const Admin = require('../../models/Staff/admin.model');
// Import responseStatus handler
const responseStatus = require('../../handlers/responseStatus.handler');

/**
 * Create program service.
 *
 * @param {Object} data - The data containing information about the program.
 * @param {string} data.name - The name of the program.
 * @param {string} data.description - The description of the program.
 * @param {string} userId - The ID of the user creating the program.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createProgramService = async (data, userId) => {
    const { name, description } = data;

    // Check if the program already exists
    const programFound = await Program.findOne({ name });
    if (programFound) {
        return responseStatus(res, 402, "failed", "Program already exists");
    }

    // Create the program
    const programCreated = await Program.create({
        name,
        description,
        createdBy: userId,
    });

    // Push the program into the admin's programs array
    const admin = await Admin.findById(userId);
    admin.programs.push(programCreated._id);
    // Save the changes
    await admin.save();

    // Send the response
    return responseStatus(res, 200, "success", programCreated);
};

/**
 * Get all programs service.
 *
 * @returns {Array} - An array of all programs.
 */
exports.getAllProgramsService = async () => {
    return await Program.find();
};

/**
 * Get a single program by ID service.
 *
 * @param {string} id - The ID of the program.
 * @returns {Object} - The program object.
 */
exports.getProgramsService = async (id) => {
    return await Program.findById(id);
};

/**
 * Update program data service.
 *
 * @param {Object} data - The data containing updated information about the program.
 * @param {string} data.name - The updated name of the program.
 * @param {string} data.description - The updated description of the program.
 * @param {string} id - The ID of the program to be updated.
 * @param {string} userId - The ID of the user updating the program.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateProgramService = async (data, id, userId) => {
    const { name, description } = data;

    // Check if the updated name already exists
    const classFound = await ClassLevel.findOne({ name });
    if (classFound) {
        return responseStatus(res, 402, "failed", "Program already exists");
    }

    // Update the program
    const programs = await Program.findByIdAndUpdate(
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
    return responseStatus(res, 200, "success", programs);
};

/**
 * Delete program data service.
 *
 * @param {string} id - The ID of the program to be deleted.
 * @returns {Object} - The deleted program object.
 */
exports.deleteProgramService = async (id) => {
    return await Program.findByIdAndDelete(id);
};
