const Tour = require('../models/tourModel');
const { getTravelAssistantResponse } = require('../services/groqService');

// @desc    Handle chat messages
// @route   POST /api/v1/chat
// @access  Public
async function handleChat(req, res) {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ 
                success: false,
                error: 'Message is required' 
            });
        }

        // Fetch all tours from database
        const tours = await Tour.find(
            {},
            'name location price duration description category'
        ).limit(50);

        // Get AI response with tour context
        const reply = await getTravelAssistantResponse(message, tours);

        res.json({ 
            success: true,
            reply 
        });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ 
            success: false,
            error: "Something went wrong. Please try again." 
        });
    }
}

module.exports = { handleChat };