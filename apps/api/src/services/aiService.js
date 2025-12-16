const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Generates text using the Gemini model based on the instruction and input text.
 * @param {string} instruction - The instructional part of the prompt.
 * @param {string} text - The user's input text context.
 * @returns {Promise<string>} - The generated plain text response.
 */
const generateText = async (instruction, text) => {
  try {
    const prompt = `${instruction}\n\nContext/Text: ${text}\n\nReturn the response in plain text only, without any markdown formatting.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate content from AI provider.');
  }
};

module.exports = {
  generateText
};
