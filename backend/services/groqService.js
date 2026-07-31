const Groq = require('groq-sdk');

// Initialize Groq with API key from config.env
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function getTravelAssistantResponse(userMessage, toursData) {
    const systemPrompt = `
You are TrekPort Travel Assistant, a helpful AI travel guide for Sri Lanka tours and safaris.

**Your Role:**
- Answer ONLY travel-related questions about tours, safaris, destinations, and bookings.
- Use ONLY the provided tour/safari data to answer.
- Be friendly, professional, and helpful.

**Available Tours & Safaris:**
${JSON.stringify(toursData, null, 2)}

**Rules:**
1. If user asks about price/duration/destination - find matching tour/safari.
2. If no tour/safari matches - say: "I don't have that tour available. Please check our Tours or Safaris page!"
3. For booking help - guide them to the booking page.
4. If user asks about general travel tips for Sri Lanka - answer helpfully.

**Response Guidelines:**
- Keep answers concise (2-3 sentences).
- Be specific about tour details (name, price, duration, location).
- Suggest similar tours if the requested one isn't available.
`;

    try {
        const response = await groq.chat.completions.create({
            // ✅ CHANGED: Updated to working model
            model: "llama-3.1-8b-instant",  // ← New model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 256
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Groq API Error:", error);
        return "Sorry, I'm having trouble connecting. Please try again later or contact our support team.";
    }
}

module.exports = { getTravelAssistantResponse };