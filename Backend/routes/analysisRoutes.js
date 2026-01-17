const express = require("express");
const {
  analyzePassage,
  getAnalysisHistory,
  getAnalysisById,
  addNoteToAnalysis,
  deleteAnalysis,
} = require("../controllers/literatureController");
const { protect } = require("../middlewares/authMiddlewares");

const router = express.Router();

// Analyze a new passage
router.post("/analyze", protect, analyzePassage);

// Get user's analysis history
router.get("/history", protect, getAnalysisHistory);

// Get specific analysis
router.get("/:id", protect, getAnalysisById);

// Add notes to an analysis
router.put("/:id/notes", protect, addNoteToAnalysis);

// Delete an analysis
router.delete("/:id", protect, deleteAnalysis);

module.exports = router;
