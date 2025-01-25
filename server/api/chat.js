const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/chat', async (req, res) => {
  try {
    const { messages, propertyContext, infrastructureContext } = req.body;

    const systemMessage = {
      role: "system",
      content: `You are FastFind AI, a helpful real estate assistant. You have access to the following property data:
        ${JSON.stringify(propertyContext)}
        
        And infrastructure data:
        ${JSON.stringify(infrastructureContext)}
        
        Provide concise, relevant responses about properties and infrastructure based on this data.
        For prices, use the ₦ symbol and format large numbers with commas.
        Always mention specific properties and their details when relevant.`
    };

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Error processing chat request' });
  }
});

module.exports = router; 