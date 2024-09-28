/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React, { useState } from 'react';
import axios from 'axios';

// Static data with interview roles and questions
const interviewData = [
    {
        "role": "Software Engineer",
        "questions": [
            { "id": 1, "question": "What is your experience with algorithms?" },
            { "id": 2, "question": "Explain a time you optimized a system." },
            { "id": 3, "question": "How would you design a scalable web application?" },
            { "id": 4, "question": "What is your experience with data structures?" },
            { "id": 5, "question": "How do you handle bugs in production?" }
        ]
    },
    {
        "role": "Data Scientist",
        "questions": [
            { "id": 1, "question": "How do you handle missing data in a dataset?" },
            { "id": 2, "question": "What is overfitting and how can it be avoided?" },
            { "id": 3, "question": "Explain a machine learning project you've worked on." },
            { "id": 4, "question": "What are the assumptions of linear regression?" },
            { "id": 5, "question": "How do you choose the right model for a dataset?" }
        ]
    },
    // Add the other roles here in a similar format...
];

const App = () => {
    const [role, setRole] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [botAnswer, setBotAnswer] = useState('');
    // Find the selected role's questions
    const selectedRoleData = interviewData.find((data) => data.role === role);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setQuestionIndex(0);
        setChatHistory([]);
        setBotAnswer('');
    };

    const handleSendAnswer = async () => {
        const currentQuestion = selectedRoleData.questions[questionIndex].question;
        const newChatHistory = [...chatHistory, { user: userAnswer, question: currentQuestion }];
        setChatHistory(newChatHistory);

        try {
            const response = await axios.post('http://localhost:5000/api/chatbot', { question: userAnswer });
            setBotAnswer(response.data.answer);
            setChatHistory([...newChatHistory, { bot: response.data.answer }]);
            setQuestionIndex(questionIndex + 1);
        } catch (error) {
            console.error("Error:", error);
        }

        setUserAnswer('');
    };

    return (
        <div>
            <h1>Interview Chatbot</h1>
            {role === '' ? (
                <div>
                    <h2>Select a Role:</h2>
                    {interviewData.map((roleData) => (
                        <button key={roleData.role} onClick={() => handleRoleSelect(roleData.role)}>{roleData.role}</button>
                    ))}
                </div>
            ) : (
                <div>
                    <h2>{role} Interview</h2>
                    <div>
                        {chatHistory.map((chat, index) => (
                            <div key={index}>
                                <p><strong>Question:</strong> {chat.question}</p>
                                <p><strong>You:</strong> {chat.user}</p>
                                {chat.bot && <p><strong>Bot:</strong> {chat.bot}</p>}
                            </div>
                        ))}
                    </div>
                    {questionIndex < selectedRoleData.questions.length ? (
                        <div>
                            <p><strong>Question {questionIndex + 1}:</strong> {selectedRoleData.questions[questionIndex].question}</p>
                            <textarea
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="Your answer"
                            />
                            <button onClick={handleSendAnswer}>Submit</button>
                        </div>
                    ) : (
                        <p>Interview complete. Thank you!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;