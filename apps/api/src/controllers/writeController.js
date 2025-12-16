const aiService = require('../services/aiService');

const generate = async (req, res) => {
  try {
    const { text, mode, tone, length } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // specific prompt logic moved from old app.js to here (or could be in service, but controller parses req)
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

    const result = await aiService.generateText(instruction, text);
    res.json({ result });

  } catch (error) {
    console.error('Controller Error:', error);
    res.status(500).json({ error: 'Failed to generate text' });
  }
};

module.exports = {
  generate
};
