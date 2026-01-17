const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Analysis = require("../models/Session"); // Using Analysis model
const { literatureAnalysisPrompt, conceptExplainPrompt } = require("../utils/prompts");

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Analyze with Google Gemini API
const analyzeWithGemini = async (passage) => {
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    console.log("Gemini API key not configured, using local analysis");
    return analyzePassageLocally(passage);
  }

  try {
    const prompt = `You are an expert literary analysis AI. Analyze the following passage and provide detailed insights in JSON format.

Passage:
"${passage}"

Provide a JSON response with EXACTLY these fields (no markdown, pure JSON):
{
  "meanings": "Detailed explanation of vocabulary choices, word meanings, and their significance to the passage",
  "literaryDevices": "Identify and explain specific literary devices used (metaphor, simile, personification, etc.) with examples",
  "themes": "Main themes and sub-themes explored in the passage",
  "symbolism": "Symbolic elements and what they represent",
  "historicalContext": "Historical, cultural, or literary context relevant to understanding the passage",
  "summary": "Concise summary of the passage's main ideas and significance"
}

Make sure each field contains at least 2-3 sentences of insightful analysis. Be specific to THIS passage, not generic.`;

    console.log("[GEMINI] Sending to Gemini API...");
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log("Failed to parse Gemini response, using local analysis");
      return analyzePassageLocally(passage);
    }
    
    const analysis = JSON.parse(jsonMatch[0]);
    console.log("[SUCCESS] Gemini analysis completed successfully!");
    return analysis;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    console.log("Falling back to local analysis...");
    return analyzePassageLocally(passage);
  }
};

// Smart local analysis (fallback if Gemini fails)
const analyzePassageLocally = (passage) => {
  const lower = passage.toLowerCase();
  
  // Get first 100 and last 100 chars for context
  const firstPart = passage.substring(0, 100);
  const lastPart = passage.substring(passage.length - 100);
  
  // Extract sentences
  const sentences = passage.match(/[^.!?]+[.!?]+/g) || [passage];
  const firstSentence = sentences[0]?.trim() || passage.substring(0, 50);
  
  // Extract words (3+ characters, filter out common words)
  const commonWords = new Set(['the', 'and', 'for', 'are', 'but', 'not', 'all', 'can', 'had', 'has', 'his', 'how', 'its', 'may', 'our', 'out', 'she', 'too', 'was', 'who', 'you', 'her', 'him', 'what', 'when', 'will', 'with', 'would', 'into', 'just', 'some', 'than', 'them', 'then', 'that', 'this']);
  
  const words = passage.match(/\b[a-z]{3,}\b/gi) || [];
  const significantWords = words.filter(w => !commonWords.has(w.toLowerCase()));
  const uniqueWords = [...new Set(significantWords.map(w => w.toLowerCase()))];
  
  // Count word frequency
  const wordFreq = {};
  significantWords.forEach(word => {
    const lower = word.toLowerCase();
    wordFreq[lower] = (wordFreq[lower] || 0) + 1;
  });
  
  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([word]) => word);
  
  const keyWordsStr = topWords.length >= 3 ? `"${topWords.slice(0, 3).join('", "')}"` : "significant vocabulary choices";
  
  // Detailed theme detection with MORE themes
  const themes = [];
  if (/love|beloved|heart|romance|affection|passion|adore|cherish/.test(lower)) themes.push("love and romance");
  if (/death|dying|died|grave|tomb|end|final|gone|lost|mortal/.test(lower)) themes.push("mortality and death");
  if (/nature|forest|tree|mountain|sky|river|ocean|wind|rain|sun|snow|bird|animal/.test(lower)) themes.push("nature and wilderness");
  if (/power|authority|control|dominance|strength|weak|conquer|rule|throne|empire/.test(lower)) themes.push("power and dominance");
  if (/society|people|human|culture|community|civilization|world|social|crowd/.test(lower)) themes.push("society and culture");
  if (/change|transform|grow|evolve|new|old|past|future|time|moment/.test(lower)) themes.push("change and time");
  if (/hope|despair|desperation|joy|sadness|happy|sad|fear|courage|brave/.test(lower)) themes.push("hope and despair");
  if (/journey|travel|road|path|wandering|escape|quest|adventure/.test(lower)) themes.push("journey and quest");
  if (/family|parent|child|brother|sister|mother|father|bond|kinship/.test(lower)) themes.push("family and kinship");
  if (/knowledge|wisdom|ignorance|learn|truth|deception|secret/.test(lower)) themes.push("knowledge and truth");
  if (!themes.length) themes.push("human experience");
  
  const primaryTheme = themes[0] || "human experience";
  const secondaryThemes = themes.slice(1, 4);
  
  // Detailed literary device detection
  const hasMetaphor = /like|as|metaphor|symbolize|\bveil\b|\blight\b.*dark|\bshade\b/.test(lower);
  const hasSimile = /like|as\.\.\.as|similar to|resembl/.test(lower);
  const hasPersonification = /personif|gave|lived|breathed|danced|sang|whisper|scream|cry|laugh|smile|sleep|awake|weep/.test(lower);
  const hasAlliteration = /\b([a-z])\w+\s+\1\w+/.test(lower);
  const hasRepetition = uniqueWords.length < significantWords.length * 0.5;
  const hasContrast = /but|however|yet|although|though|contrast|opposite|different|unlike|while/.test(lower);
  const hasSymbolism = /light|dark|shadow|fire|water|rose|cross|gate|door|window|mirror|mirror|cycle|season/.test(lower);
  const hasIrony = /irony|ironic|said|claimed|pretend|mask|disguise/.test(lower);
  const hasHyperbole = /never|always|forever|eternal|infinite|endless|boundless|overwhelming/.test(lower);
  
  const devices = [];
  if (hasSimile) devices.push("simile");
  if (hasMetaphor) devices.push("metaphor");
  if (hasPersonification) devices.push("personification");
  if (hasAlliteration) devices.push("alliteration");
  if (hasIrony) devices.push("irony");
  if (hasHyperbole) devices.push("hyperbole");
  if (hasContrast) devices.push("contrast");
  if (hasSymbolism) devices.push("symbolism");
  if (hasRepetition) devices.push("repetition");
  
  const devicesStr = devices.length > 0 ? devices.join(", ") : "vivid descriptive language";
  
  // Analyze passage characteristics
  const avgWordLength = significantWords.length > 0 ? significantWords.reduce((sum, w) => sum + w.length, 0) / significantWords.length : 5;
  const complexity = avgWordLength > 6 ? "sophisticated and complex" : avgWordLength > 5 ? "moderately complex" : "accessible";
  const passageLength = passage.length > 1000 ? "extensive and detailed" : passage.length > 500 ? "substantial" : passage.length > 200 ? "moderate-length" : "brief";
  const sentenceCount = sentences.length;
  const avgSentenceLength = sentenceCount > 0 ? passage.length / sentenceCount : 30;
  const pacing = avgSentenceLength > 80 ? "measured and deliberate" : avgSentenceLength > 50 ? "moderate" : "brisk and dynamic";
  
  return {
    meanings: `The passage employs ${complexity} language to explore ${primaryTheme}. Key words including ${keyWordsStr} reveal the author's focus on ${primaryTheme.toLowerCase()}. The author's vocabulary choices - particularly the use of ${topWords[0] ? topWords[0] : "significant"} - demonstrate deliberate crafting to evoke specific emotional and intellectual responses from the reader.`,
    
    literaryDevices: `The author utilizes multiple literary techniques including ${devicesStr} to enhance the passage's impact. ${hasPersonification ? "Objects and nature are given human qualities," : ""} ${hasSymbolism ? "symbolic imagery creates layers of meaning," : ""} ${hasContrast ? "contrasting elements highlight central conflicts," : ""} and ${hasRepetition ? "repeated phrases reinforce key ideas." : "rhythm and word choice guide the reader's experience."} These devices work in concert to deepen both meaning and emotional resonance.`,
    
    themes: `The primary theme of ${primaryTheme} permeates the passage. ${secondaryThemes.length > 0 ? `This is reinforced by secondary themes of ${secondaryThemes.slice(0, 2).join(" and ")}.` : ""} The author explores how ${primaryTheme.toLowerCase()} intersects with the human condition, inviting readers to contemplate their own experiences and beliefs.`,
    
    symbolism: `${hasSymbolism ? "Rich symbolic imagery - including references to light, darkness, and natural elements - " : "The passage uses "}language to carry meaning beyond the literal level. ${topWords[1] ? `The recurring concept of "${topWords[1]}" functions symbolically` : "Key images function symbolically"} to represent abstract ideas about ${primaryTheme.toLowerCase()}. These symbols create a unified artistic vision that deepens with each reading.`,
    
    historicalContext: `This ${passageLength} passage reflects literary traditions of character development, thematic exploration, and ${pacing} pacing. The author's engagement with ${primaryTheme.toLowerCase()} connects to broader philosophical and cultural conversations about meaning, purpose, and human connection. The formal and stylistic choices suggest influence from the literary canon of introspective, thematically complex works.`,
    
    summary: `This ${passageLength} passage is a ${complexity} meditation on ${primaryTheme}. Through the use of ${devicesStr}, the author crafts a narrative that challenges readers to examine ${primaryTheme.toLowerCase()}. The opening "${firstSentence.substring(0, 40)}..." establishes a ${pacing} rhythm that carries the reader through a profound exploration of human experience, ultimately offering insights into ${primaryTheme.toLowerCase()}.`,
  };
};

// Mock data for fallback
const generateMockAnalysis = (passage, userQuestion) => {
  return {
    meanings: "The passage uses rich vocabulary to convey deeper meanings. Key words have been carefully selected by the author to enhance the emotional impact and create vivid imagery.",
    literaryDevices: "The passage employs several literary devices including metaphor, imagery, and symbolism. These devices work together to create a compelling narrative and enhance the reader's understanding.",
    themes: "The central theme appears to be the struggle between past and present, tradition and change. The passage explores how external circumstances shape human experience.",
    symbolism: "Various symbols are used throughout to represent deeper ideas: light represents hope or knowledge, darkness represents uncertainty or the unknown.",
    historicalContext: "Understanding the historical period in which this work was written is essential. The social and cultural context of the time influences the author's perspective and message.",
    summary: "This passage is a profound exploration of human experience, using literary techniques to convey complex emotions and ideas. The author masterfully weaves together multiple themes to create a meaningful narrative that resonates with readers."
  };
};

/* ===============================
   Analyze Literature Passage
================================ */
const analyzePassage = async (req, res) => {
  try {
    const { passage, userQuestion, title, author, analysisId } = req.body;
    const userId = req.user.id;

    if (!passage) {
      return res.status(400).json({ message: "Passage text is required" });
    }

    // Limit passage length to avoid API overload
    if (passage.length > 5000) {
      return res.status(400).json({ message: "Passage too long (max 5000 characters)" });
    }

    const prompt = literatureAnalysisPrompt(passage, userQuestion);

    let analysisData;

    try {
      // Use Google Gemini for AI-powered analysis
      analysisData = await analyzeWithGemini(passage);
    } catch (apiError) {
      console.log("Error during analysis, using local fallback:", apiError.message);
      analysisData = analyzePassageLocally(passage);
    }

    // Simple logic: If analysisId provided, update it. Otherwise create new.
    let result;
    console.log("=== ANALYZE REQUEST ===");
    console.log("analysisId received:", analysisId);
    console.log("passage:", passage.substring(0, 50) + "...");
    
    if (analysisId) {
      // Update existing by ID
      console.log("✓ UPDATING by ID:", analysisId);
      const existingAnalysis = await Analysis.findById(analysisId);
      
      if (!existingAnalysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      if (existingAnalysis.user.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      existingAnalysis.passage = passage.trim();
      existingAnalysis.title = title || "Untitled";
      existingAnalysis.author = author || "Unknown";
      existingAnalysis.aiAnalysis = analysisData;
      existingAnalysis.updatedAt = new Date();
      await existingAnalysis.save();
      result = existingAnalysis;
      console.log("✓ UPDATED successfully");
    } else {
      // Always create new
      console.log("✓ CREATING new analysis");
      const newAnalysis = new Analysis({
        user: userId,
        passage: passage.trim(),
        title: title || "Untitled",
        author: author || "Unknown",
        aiAnalysis: analysisData,
      });
      await newAnalysis.save();
      result = newAnalysis;
      console.log("✓ CREATED with ID:", result._id);
    }
    
    console.log("=== END REQUEST ===");

    return res.status(201).json({
      success: true,
      analysisId: result._id,
      analysis: analysisData,
    });
  } catch (error) {
    console.error("Analysis error:", error.message);
    return res.status(500).json({
      message: "Failed to analyze passage",
      error: error.message,
    });
  }
};

/* ===============================
   Get Analysis History
================================ */
const getAnalysisHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const analyses = await Analysis.find({ user: userId })
      .select("-aiAnalysis.explanation") // Don't load full analysis to reduce data
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({
      success: true,
      count: analyses.length,
      analyses: analyses,
    });
  } catch (error) {
    console.error("History error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch analysis history",
      error: error.message,
    });
  }
};

/* ===============================
   Get Single Analysis
================================ */
const getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    // Verify user owns this analysis
    if (analysis.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    return res.status(200).json({
      success: true,
      analysis: analysis,
    });
  } catch (error) {
    console.error("Fetch error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch analysis",
      error: error.message,
    });
  }
};

/* ===============================
   Add Note to Analysis
================================ */
const addNoteToAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const userId = req.user.id;

    if (!note) {
      return res.status(400).json({ message: "Note is required" });
    }

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    if (analysis.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    analysis.notes = note;
    await analysis.save();

    return res.status(200).json({
      success: true,
      message: "Note added successfully",
      analysis: analysis,
    });
  } catch (error) {
    console.error("Note error:", error.message);
    return res.status(500).json({
      message: "Failed to add note",
      error: error.message,
    });
  }
};

/* ===============================
   Delete Analysis
================================ */
const deleteAnalysis = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const analysis = await Analysis.findById(id);

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    if (analysis.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await Analysis.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Analysis deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error.message);
    return res.status(500).json({
      message: "Failed to delete analysis",
      error: error.message,
    });
  }
};

module.exports = {
  analyzePassage,
  getAnalysisHistory,
  getAnalysisById,
  addNoteToAnalysis,
  deleteAnalysis,
};
