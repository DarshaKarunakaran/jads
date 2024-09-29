const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, JS

// Predefined questions for different roles
const interviewQuestions = {
  "software_engineer": [
    "What is your experience with algorithms?",
    "Explain a time you optimized a system.",
    "How would you design a scalable web application?"
  ],
  "data_scientist": [
    "How do you handle missing data in a dataset?",
    "What is overfitting and how can it be avoided?",
    "Explain a machine learning project you've worked on."
  ],
  "devops_engineer": [
    "What tools do you use for CI/CD?",
    "Explain how you would automate infrastructure scaling.",
    "What is your experience with Docker and Kubernetes?"
  ]
};

// Endpoint to get questions based on role
app.get('/get-questions/:role', (req, res) => {
  const role = req.params.role.toLowerCase();
  const questions = interviewQuestions[role];
  if (questions) {
    res.json({ questions });
  } else {
    res.status(404).json({ message: "Role not found" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});