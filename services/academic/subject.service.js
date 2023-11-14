// Import necessary models
const Subject = require("../../models/Academic/subject.model");
// const ClassLevel = require("../../models/Academic/class.model");
const Program = require('../../models/Academic/program.model');
// Import responseStatus handler
const responseStatus = require('../../handlers/responseStatus.handler');

/**
 * Create Subject service.
 *
 * @param {Object} data - The data containing information about the Subject.
 * @param {string} data.name - The name of the Subject.
 * @param {string} data.description - The description of the Subject.
 * @param {string} data.academicTerm - The academic term associated with the Subject.
 * @param {string} programId - The ID of the program the Subject is associated with.
 * @param {string} userId - The ID of the user creating the Subject.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createSubjectService = async (data, programId, userId) => {
    const { name, description, academicTerm } = data;

    // Find the program
    const programFound = await Program.findById(programId);
    if (!programFound) return responseStatus(res, 402, "failed", "Program not found");

    // Check if the Subject already exists
    const SubjectFound = await Subject.findOne({ name });
    if (SubjectFound) {
        return responseStatus(res, 402, "failed", "Subject already exists");
    }

    // Create the Subject
    const SubjectCreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: userId,
    });

    // Push the object ID to program
    programFound.subjects.push(SubjectCreated._id);
    await programFound.save();

    // Send the response
    return responseStatus(res, 200, "success", SubjectCreated);
};

/**
 * Get all Subjects service.
 *
 * @returns {Array} - An array of all Subjects.
 */
exports.getAllSubjectsService = async () => {
    return await Subject.find();
};

/**
 * Get a single Subject by ID service.
 *
 * @param {string} id - The ID of the Subject.
 * @returns {Object} - The Subject object.
 */
exports.getSubjectsService = async (id) => {
    return await Subject.findById(id);
};

/**
 * Update Subject data service.
 *
 * @param {Object} data - The data containing updated information about the Subject.
 * @param {string} data.name - The updated name of the Subject.
 * @param {string} data.description - The updated description of the Subject.
 * @param {string} data.academicTerm - The updated academic term associated with the Subject.
 * @param {string} id - The ID of the Subject to be updated.
 * @param {string} userId - The ID of the user updating the Subject.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateSubjectService = async (data, id, userId) => {
    const { name, description, academicTerm } = data;

    // Check if the updated name already exists
    const classFound = await Subject.findOne({ name });
    if (classFound) {
        return responseStatus(res, 402, "failed", "Subject already exists");
    }

    // Update the Subject
    const Subjects = await Subject.findByIdAndUpdate(
        id,
        {
            name,
            description,
            academicTerm,
            createdBy: userId,
        },
        {
            new: true,
        }
    );

    // Send the response
    return responseStatus(res, 200, "success", Subjects);
};

/**
 * Delete Subject data service.
 *
 * @param {string} id - The ID of the Subject to be deleted.
 * @returns {Object} - The deleted Subject object.
 */
exports.deleteSubjectService = async (id) => {
    return await Subject.findByIdAndDelete(id);
};
