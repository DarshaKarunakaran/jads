/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apiUrl = '${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=2023-06-01-preview';

app.post('/api/chatbot', async (req, res) => {
    const { question } = req.body;

    const data = {
        model: "gpt-35-turbo",  // or "gpt-4" depending on your Azure OpenAI deployment
        messages: [
            { role: "system", content: "You are an interview chatbot." },
            { role: "user", content: question }
        ]
    };

    try {
        const response = await axios.post(apiUrl, data, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': process.env.AZURE_OPENAI_API_KEY
            }
        });

        const answer = response.data.choices[0].message.content;
        res.json({ answer });
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).send("Error generating response");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));