const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('../config/env');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.generateSocialContent = async (req, res) => {
  try {
    const { platform, type, topic, audience, cta } = req.body;

    // Define specific JSON schemas for stability
    const schemas = {
      video: `
      {
        "script": [
          { "time": "0:00-0:03", "visual": "Description of scene", "audio": "Spoken words" }
        ],
        "hashtags": ["#tag1", "#tag2"]
      }`,
      thread: `
      {
        "tweets": ["Tweet 1", "Tweet 2", "Tweet 3"]
      }`,
      standard: `
      {
        "hook": "Opening line",
        "body": "Main content",
        "hashtags": ["#tag1"]
      }`
    };

    let targetSchema = schemas.standard;
    if (['TikTok', 'YouTube Shorts', 'Instagram Reels'].includes(platform)) {
      targetSchema = schemas.video;
    } else if (type === 'Thread') {
      targetSchema = schemas.thread;
    }

    const prompt = `
      Act as a viral content strategist.
      Platform: ${platform}
      Type: ${type}
      Topic: ${topic}
      Audience: ${audience}
      CTA: ${cta}

      Logic Rules:
      1. If TikTok/Reels/Shorts: Create a fast-paced, engaging video script.
      2. If Twitter Thread: Create a connected story or listicle.
      3. If LinkedIn/Post: Create a high-value structured post with a strong hook.

      CRITICAL: Return ONLY valid JSON matching this structure:
      ${targetSchema}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    res.json({ result: JSON.parse(cleanText) });

  } catch (error) {
    console.error('Social Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
};
