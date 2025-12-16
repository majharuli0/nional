const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors({ origin: '*' })); // Allow all origins for now to prevent CORS issues during dev
app.use(express.json());

app.get('/', (req, res) => res.send('Nional API Core is Running'));

// Tool 1: Nional Write (Unified Endpoint)
app.post('/api/write/generate', async (req, res) => {
    try {
        const { text, mode, tone, length } = req.body;
        if (!text) return res.status(400).json({ error: 'Text is required' });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // Construct prompt based on mode
        let instruction = "";
        switch (mode) {
            case 'humanize':
                instruction = "Rewrite the following text to sound more natural and human-like. Use varied sentence structure and casual idioms to bypass AI detection. Do not change the original meaning.";
                break;
            case 'reword':
                instruction = `Rewrite the following text to be more ${tone} and improve clarity, grammar, and flow.`;
                break;
            case 'summarize':
                instruction = `Create a ${length} bullet-point summary of the following text. Focus on key facts and actionable takeaways.`;
                break;
            case 'email':
                instruction = `Draft a ${tone}, ${length} email based on the following notes or context.`;
                break;
            case 'expand':
                instruction = `Expand the following text into a ${length} paragraph. Add relevant details and context while maintaining a ${tone} tone.`;
                break;
            default:
                instruction = "Rewrite the text.";
        }

        const prompt = `${instruction}\n\nContext/Text: ${text}\n\nReturn the response in plain text only, without any markdown formatting.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.text();

        res.json({ result: generatedText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
});

// Example Module: PDF
app.post('/api/pdf/convert', (req, res) => {
    res.json({ status: 'success', message: 'PDF converted' });
});

app.listen(3001, () => console.log('API running on port 3001'));