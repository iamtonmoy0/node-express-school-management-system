exports.resultCalculate = async (questions, answers, exam) => {
  //Build report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let status = ""; //failed/passed
  let grade = 0;
  let remarks = "";
  let score = 0;
  let answeredQuestions = [];
  //  looping through all the questions and finding the answers
  for (let i = 0; i < questions.length; i++) {
    // single question
    const question = questions[i];
    // checking the correct answers
    if (question.correctAnswer === answers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }
  // calculating the percentage of correct answers
  totalQuestions = questions.length;
  grade = (correctAnswers / questions.length) * 100;
  answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctAnswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });
  //calculate status
  if (grade >= exam.passMark) {
    status = "Pass";
  } else {
    status = "Fail";
  }

  //Remarks
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 60) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
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
