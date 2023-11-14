// Import necessary models
const responseStatus = require("../../handlers/responseStatus.handler");
const Exam = require("../../models/Academic/exams.model");
const Questions = require("../../models/Academic/questions.model");

/**
 * Create questions service.
 *
 * @param {Object} data - The data containing information about the question.
 * @param {string} data.question - The question text.
 * @param {string} data.optionA - Option A for the question.
 * @param {string} data.optionB - Option B for the question.
 * @param {string} data.optionC - Option C for the question.
 * @param {string} data.optionD - Option D for the question.
 * @param {string} data.correctAnswer - The correct answer for the question.
 * @param {string} examId - The ID of the exam the question is associated with.
 * @param {string} teacherId - The ID of the teacher creating the question.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.createQuestionsService = async (data, examId, teacherId, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = data;

  // Finding the exam
  const exam = await Exam.findById(examId);
  // If exam not found
  if (!exam) return responseStatus(res, 404, "failed", "Exam not found");

  // Finding duplicate question
  const isQuestion = await Questions.findOne({ question });
  if (!isQuestion)
    return responseStatus(res, 405, "failed", "This Question already exists");

  // Create question
  const createQuestions = await Questions.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: teacherId,
  });

  // If question is created successfully
  exam.questions.push(createQuestions._id);
  await exam.save();
  return responseStatus(res, 201, "success", createQuestions);
};

/**
 * Get all questions service.
 *
 * @returns {Array} - An array of all questions.
 */
exports.getAllQuestionsService = async () => {
  return await Questions.find();
};

/**
 * Get questions by ID service.
 *
 * @param {string} questionId - The ID of the question.
 * @returns {Object} - The question object.
 */
exports.getQuestionsByIdService = async (questionId) => {
  return await Questions.findById(questionId);
};

/**
 * Update questions service.
 *
 * @param {Object} data - The data containing updated information about the question.
 * @param {string} data.question - The updated question text.
 * @param {string} data.optionA - The updated Option A for the question.
 * @param {string} data.optionB - The updated Option B for the question.
 * @param {string} data.optionC - The updated Option C for the question.
 * @param {string} data.optionD - The updated Option D for the question.
 * @param {string} data.correctAnswer - The updated correct answer for the question.
 * @param {string} questionId - The ID of the question to be updated.
 * @param {string} userId - The ID of the user updating the question.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object indicating success or failure.
 */
exports.updateQuestionsService = async (data, questionId, userId, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } = data;

  // Check if the updated question already exists
  const questionFound = await Questions.findOne({ question });
  if (questionFound)
    return responseStatus(res, 401, "failed", "Question already exists");

  // Update the question
  const questionCreate = await Questions.findByIdAndUpdate(
    questionId,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: userId,
    },
    {
      new: true,
    }
  );

  return responseStatus(res, 201, "success", questionCreate);
};
