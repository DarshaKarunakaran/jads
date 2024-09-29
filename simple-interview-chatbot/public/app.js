// Interview Questions for different roles
const interviewQuestions = {
  "software_engineer": {
    questions: [
      "What is your experience with algorithms?",
      "Explain a time you optimized a system.",
      "How would you design a scalable web application?",
      "What is the Big-O complexity of binary search?",
      "What is a closure in JavaScript?"
    ],
    answers: [
      "Extensive experience with sorting algorithms, search algorithms, etc.",
      "Once optimized the load time by 20% by refactoring the database queries.",
      "Design it using microservices architecture with load balancers.",
      "O(log n)",
      "A closure is a function that has access to the parent scope, even after the parent function has closed."
    ]
  },
  "data_scientist": {
    questions: [
      "How do you handle missing data in a dataset?",
      "What is overfitting and how can it be avoided?",
      "Explain a machine learning project you've worked on.",
      "What is the difference between supervised and unsupervised learning?",
      "What is regularization in machine learning?"
    ],
    answers: [
      "Use techniques like mean imputation, forward fill, or drop rows/columns.",
      "Overfitting occurs when the model performs well on training data but fails on test data. Use techniques like cross-validation or regularization to avoid it.",
      "Worked on a sentiment analysis project using NLP and classification models.",
      "Supervised learning uses labeled data, while unsupervised learning uses unlabeled data.",
      "Regularization is a technique to prevent overfitting by adding a penalty to the model complexity."
    ]
  },
  "devops_engineer": {
    questions: [
      "What tools do you use for CI/CD?",
      "Explain how you would automate infrastructure scaling.",
      "What is your experience with Docker and Kubernetes?",
      "What is infrastructure as code (IaC)?",
      "Explain the process of load balancing."
    ],
    answers: [
      "Jenkins, GitLab CI, CircleCI, etc.",
      "Use auto-scaling groups with cloud providers like AWS or GCP.",
      "Extensive experience in containerization with Docker and orchestrating containers using Kubernetes.",
      "IaC is managing and provisioning computing infrastructure through machine-readable scripts.",
      "Load balancing distributes network or application traffic across multiple servers to ensure no single server becomes overwhelmed."
    ]
  },
  "project_manager": {
    questions: [
      "How do you prioritize tasks in a project?",
      "Explain a time when you handled a difficult project.",
      "What tools do you use for project management?",
      "What is the critical path method?",
      "How do you manage stakeholder expectations?"
    ],
    answers: [
      "Use a combination of MoSCoW prioritization and regular team check-ins.",
      "Handled a complex project with multiple stakeholders by breaking it into smaller milestones and managing expectations.",
      "Tools like Jira, Trello, MS Project, etc.",
      "Critical path method (CPM) is a project management technique that determines the longest stretch of dependent activities.",
      "Regular updates, transparent communication, and managing scope changes effectively."
    ]
  },
  "qa_engineer": {
    questions: [
      "What is the difference between black-box and white-box testing?",
      "How do you write effective test cases?",
      "What tools do you use for automation testing?",
      "What is regression testing?",
      "How do you handle a situation where you find a critical bug late in the release cycle?"
    ],
    answers: [
      "Black-box testing focuses on inputs and outputs, while white-box testing looks at the internal logic.",
      "Test cases should be clear, concise, and cover both positive and negative scenarios.",
      "Selenium, JUnit, TestNG, etc.",
      "Regression testing ensures that new changes haven't broken existing functionality.",
      "Communicate the risk to the team and work with stakeholders to either fix it or postpone the release."
    ]
  }
};

// Dropdown Change Event
document.getElementById('jobSelect').addEventListener('change', (e) => {
  const role = e.target.value;
  if (interviewQuestions[role]) {
    loadQuestions(role);
  } else {
    document.getElementById('questionContainer').innerHTML = '';
  }
});

// Load Questions for the Selected Role
function loadQuestions(role) {
  const { questions } = interviewQuestions[role];
  const questionContainer = document.getElementById('questionContainer');
  questionContainer.innerHTML = ''; // Clear any existing questions

  questions.forEach((question, index) => {
    const questionLabel = document.createElement('label');
    questionLabel.textContent = `Q${index + 1}: ${question}`;
    questionContainer.appendChild(questionLabel);

    const answerInput = document.createElement('textarea');
    answerInput.setAttribute('id', `answer_${index}`);
    answerInput.setAttribute('rows', '2');
    questionContainer.appendChild(answerInput);
  });

  // Show submit button
  document.getElementById('submitBtn').style.display = 'block';
}

// Submit Button Event
document.getElementById('submitBtn').addEventListener('click', () => {
  const role = document.getElementById('jobSelect').value;
  const { answers } = interviewQuestions[role];
  let userAnswers = [];

  answers.forEach((_, index) => {
    const userAnswer = document.getElementById(`answer_${index}`).value;
    userAnswers.push(userAnswer);
  });

  evaluateAnswers(userAnswers, answers);
});

// Evaluate the User's Answers
function evaluateAnswers(userAnswers, correctAnswers) {
  const resultContainer = document.getElementById('interviewResult');
  resultContainer.innerHTML = ''; // Clear previous results
  let correctCount = 0;

  userAnswers.forEach((answer, index) => {
    const userAnswer = answer.trim().toLowerCase();
    const correctAnswer = correctAnswers[index].trim().toLowerCase();

    const resultText = document.createElement('p');
    resultText.textContent = `Q${index + 1}: Your answer: "${answer}". Correct answer: "${correctAnswers[index]}"`;

    if (userAnswer === correctAnswer) {
      correctCount++;
      resultText.style.color = 'green';
    } else {
      resultText.style.color = 'red';
    }

    resultContainer.appendChild(resultText);
  });

  // Display final result
  const finalResult = document.createElement('p');
  finalResult.textContent = `You answered ${correctCount} out of ${correctAnswers.length} correctly.`;
  finalResult.style.fontWeight = 'bold';
  resultContainer.appendChild(finalResult);
}
