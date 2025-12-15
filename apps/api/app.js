const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors({ origin: '*' })); // Allow all origins for now to prevent CORS issues during dev
app.use(express.json());

app.get('/', (req, res) => res.send('Nional API Core is Running'));

// Tool 1: AI Humanizer
app.post('/api/humanize', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `Rewrite this text to be more conversational, vary sentence length, and use natural idioms. Maintain the original meaning. Return the response in plain text only, without any markdown formatting. Text: ${text}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const humanizedText = response.text();

        res.json({ result: humanizedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to humanize text' });
    }
});

// Example Module: PDF
app.post('/api/pdf/convert', (req, res) => {
    res.json({ status: 'success', message: 'PDF converted' });
});

app.listen(3001, () => console.log('API running on port 3001'));