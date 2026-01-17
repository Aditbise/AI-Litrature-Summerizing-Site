const mongoose = require("mongoose");
const analysisSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    passage: { type: String, required: true }, // The literature text to analyze
    title: String, // Optional: Title of the work
    author: String, // Optional: Author name
    userQuestion: String, // User's specific question about the passage
    aiAnalysis: {
        meanings: String, // Explanation of meanings/vocabulary
        literaryDevices: String, // Metaphors, similes, personification, etc.
        themes: String, // Main themes and ideas
        symbolism: String, // Symbols and their meanings
        historicalContext: String, // Historical/cultural context
        summary: String, // Overall interpretation
    },
    savedAnalyses: [
        {
            question: String,
            analysis: String,
            savedAt: { type: Date, default: Date.now },
        }
    ],
    notes: String, // User's personal notes
}, { timestamps: true });

module.exports = mongoose.model("Analysis", analysisSchema);