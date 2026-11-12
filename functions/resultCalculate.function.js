exports.resultCalculate = async (questions, answers, exam) => {
  //Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let status = "failed";
  let grade = 0;
  let remarks = "";
  let score = 0;
  const answeredQuestions = [];
  if (!Array.isArray(answers) || answers.length !== questions.length || questions.length === 0) {
    throw new Error("Answers must be provided for every exam question");
  }
  //  looping through all the questions and finding the answers
  for (let i = 0; i < questions.length; i++) {
    // single question
    const question = questions[i];
    // checking the correct answers
    if (question.correctAnswer === answers[i]) {
      correctAnswers++;
      score++;
    } else {
      wrongAnswers++;
    }
  }
  // calculating the percentage of correct answers
  grade = (correctAnswers / questions.length) * 100;
  questions.forEach((question, index) => {
    const isCorrect = question.correctAnswer === answers[index];
    answeredQuestions.push({
      question: question.question,
      answer: answers[index],
      isCorrect,
    });
  });
  //calculate status
  if (grade >= exam.passMark) {
    status = "passed";
  } else {
    status = "failed";
  }

  //Remarks
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 60) {
    remarks = "Good";
  } else {
    remarks = "Poor";
  }

  // return the result
  return {
    correctAnswers,
    wrongAnswers,
    status,
    grade,
    remarks,
    score,
    answeredQuestions,
  };
};
