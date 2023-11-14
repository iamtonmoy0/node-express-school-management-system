// Import necessary models
const Teacher = require("../../models/Staff/teachers.model");
const Exams = require("../../models/Academic/exams.model");
// Import responseStatus handler
const responseStatus = require("../../handlers/responseStatus.handler");

/**
 * Create exam service by a teacher.
 *
 * @param {Object} data - The data containing information about the exam.
 * @param {string} data.name - The name of the exam.
 * @param {string} data.description - The description of the exam.
 * @param {string} data.subject - The subject of the exam.
 * @param {string} data.program - The program associated with the exam.
 * @param {number} data.passMark - The pass mark for the exam.
 * @param {number} data.totalMark - The total mark for the exam.
 * @param {string} data.academicTerm - The academic term associated with the exam.
 * @param {number} data.duration - The duration of the exam.
 * @param {string} data.examDate - The date of the exam.
 * @param {string} data.examTime - The time of the exam.
 * @param {string} teacherId - The ID of the teacher creating the exam.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createExamService = async (data, teacherId) => {
  const {
    name,
    description,
    subject,
    program,
    passMark,
    totalMark,
    academicTerm,
    duration,
    examDate,
    examTime,
  } = data;

  // Find the teacher
  const teacherExist = await Teacher.findById(teacherId);
  if (!teacherExist)
    return responseStatus(res, 401, "failed", "Teacher not found!");

  // Check if the exam already exists
  const examExist = await Exams.findOne({ name });
  if (examExist)
    return responseStatus(res, 402, "failed", "Exam already exists");

  // Create the exam
  const examCreate = await Exams.create({
    name,
    description,
    subject,
    program,
    passMark,
    totalMark,
    academicTerm,
    duration,
    examDate,
    examTime,
    createdBy: teacherExist._id,
  });

  // Save exam ID to the teacher collection
  teacherExist.examsCreated.push(examCreate._id);
  await teacherExist.save();

  // Send the response
  return responseStatus(res, 200, "success", examCreate);
};

/**
 * Get all exams service.
 *
 * @returns {Array} - An array of all exams.
 */
exports.getAllExamService = async () => {
  return await Exams.find();
};

/**
 * Get exam by ID service.
 *
 * @param {string} id - The ID of the exam.
 * @returns {Object} - The exam object.
 */
exports.getExamByIdService = async (id) => {
  return await Exams.findById(id);
};

/**
 * Update exam service.
 *
 * @param {Object} data - The data containing updated information about the exam.
 * @param {string} data.name - The updated name of the exam.
 * @param {string} data.description - The updated description of the exam.
 * @param {string} data.subject - The updated subject of the exam.
 * @param {string} data.program - The updated program associated with the exam.
 * @param {string} data.academicTerm - The updated academic term associated with the exam.
 * @param {number} data.duration - The updated duration of the exam.
 * @param {string} data.examDate - The updated date of the exam.
 * @param {string} data.examTime - The updated time of the exam.
 * @param {string} data.examType - The updated type of the exam.
 * @param {string} data.createdBy - The updated ID of the user creating the exam.
 * @param {string} data.academicYear - The updated academic year associated with the exam.
 * @param {string} data.classLevel - The updated class level associated with the exam.
 * @param {string} examId - The ID of the exam to be updated.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateExamService = async (data, examId) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    createdBy,
    academicYear,
    classLevel,
  } = data;

  // Check if the updated name already exists
  const examFound = await Exams.findOne({ name });
  if (examFound) {
    return responseStatus(res, 402, "failed", "Exam already exists");
  }

  // Update the exam
  const examUpdated = await Exams.findByIdAndUpdate(
    examId,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      examTime,
      examType,
      createdBy,
      academicYear,
      classLevel,
    },
    {
      new: true,
    }
  );

  // Send the response
  return responseStatus(res, 200, "success", examUpdated);
};
