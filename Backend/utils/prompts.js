// Literature Analysis Prompts

const literatureAnalysisPrompt = (passage, userQuestion) => `
You are an expert English literature professor and analyst with deep knowledge of literary analysis, textual interpretation, and critical thinking. Analyze the following passage comprehensively and provide detailed, insightful explanations.

PASSAGE:
"${passage}"

USER'S QUESTION:
${userQuestion || "Provide a comprehensive and detailed analysis of this passage"}

TASK:
Provide an in-depth analysis in the following JSON format with these exact sections. Each field must contain detailed, multi-sentence explanations with specific examples from the text.

{
    "meanings": "Provide a comprehensive explanation of the vocabulary, word choices, diction, and their deeper meanings. Define all difficult or significant words and explain why the author specifically chose them. Discuss how the language choices contribute to tone, mood, and overall meaning. Include at least 3-4 sentences with specific examples.",
    "literaryDevices": "Thoroughly identify and explain ALL literary devices used (metaphor, simile, personification, alliteration, irony, symbolism, imagery, foreshadowing, etc.) and analyze their specific effects on the reader. For each device, provide the exact quote and explain its purpose and impact. Include detailed analysis of how these devices work together to create meaning.",
    "themes": "Comprehensively identify the main themes and central ideas explored in the passage. Explain what the passage reveals about human nature, society, morality, or existence beyond the surface level. Discuss how different elements of the text contribute to these themes and what the author seems to be saying about them.",
    "symbolism": "Thoroughly identify any symbols, symbolic language, or symbolic actions and explain in detail what they represent and why they matter. Analyze how symbols connect to larger themes and what deeper meanings they add to the passage. Explain the significance of symbolic choices.",
    "historicalContext": "Provide detailed relevant historical, cultural, biographical, or literary context that significantly helps understand the passage. Discuss the time period, cultural values, literary movements, or author's life circumstances that influenced the work. Explain how this context shapes interpretation.",
    "summary": "Provide a comprehensive overall interpretation and analysis of the passage in 4-5 sentences. Synthesize all elements to explain the passage's significance and what makes it meaningful or important."
}

IMPORTANT GUIDELINES:
- Return ONLY valid JSON, no extra text before or after
- Make all explanations substantive, detailed, and educational (minimum 2-3 sentences per field)
- Use specific quotes and examples from the passage to support every claim
- Write for advanced students and learners who want deep understanding
- Provide analytical depth that goes beyond surface-level observation
- Connect different elements to show how they work together
`;

const conceptExplainPrompt = (concept) => `
You are an expert English literature teacher with deep expertise in literary concepts and terminology. Explain the following literary concept or term thoroughly and comprehensively.

CONCEPT: "${concept}"

TASK:
Provide a detailed educational explanation in JSON format:

{
    "title": "Clear, descriptive title of the concept",
    "explanation": "Provide a comprehensive explanation as if teaching an advanced student. Include: a clear definition, why it matters in literature, detailed examples of how it appears in famous works, how to identify it when reading, and practical applications for literary analysis. Make it detailed and substantive (at least 4-5 sentences)."
}

IMPORTANT:
- Return ONLY valid JSON, no extra text
- Make explanations thorough, detailed, and educational
- Include multiple specific literary examples from well-known works
- Explain both the concept itself and its significance
- Provide practical guidance on identifying and analyzing the concept in texts
`;

module.exports = { literatureAnalysisPrompt, conceptExplainPrompt };