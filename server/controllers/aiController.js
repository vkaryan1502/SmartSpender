import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller to get short AI insight
export const getAIInsights = async (req, res) => {
  const { income, expenses } = req.body;

  if (!income || !expenses || typeof expenses !== 'object') {
    return res.status(400).json({ error: 'Please provide income and expenses (as an object).' });
  }

  try {
    // Create structured prompt
    const prompt = `
You're a personal finance assistant. The user provides total income and categorized expenses.
Return a maximum of 2 insights based on spending vs income.
Output should ONLY be in the following strict JSON format:

{
  "aiInsights": "Your concise financial insight here."
}

No explanations, no markdown, no headings. Keep it short and data-based.

Example Input:
{ "income": 10000, "expenses": { "food": 3000, "entertainment": 1000 } }

Now analyze this:
${JSON.stringify({ income, expenses })}
    `;

    // Call Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Try to parse JSON safely
   // Strip markdown fences (```json ... ```)
const cleaned = text.replace(/```json|```/g, '').trim();

let aiOutput;
try {
  aiOutput = JSON.parse(cleaned);
} catch (parseErr) {
  return res.status(500).json({ error: 'Failed to parse Gemini AI response.', raw: cleaned });
}


    res.status(200).json(aiOutput);
  } catch (err) {
    console.error('🔥 AI Controller Error:', err.message);
    res.status(500).json({ error: 'Failed to generate AI insights' });
  }
};


// import genAI from '../utils/geminiClient.js';

// export const analyzeTransactions = async (req, res) => {
//   const { transactions } = req.body;

//   if (!transactions || !Array.isArray(transactions)) {
//     return res.status(400).json({ error: 'Invalid transactions format' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

//     const prompt = `
//       You are a smart finance advisor. Analyze the following transaction data and provide:
//       - Total expenses
//       - Percentage of spending by category
//       - Any categories that seem too high
//       - Suggestions for saving money

//       Transactions:
//       ${JSON.stringify(transactions, null, 2)}
//     `;

//     const result = await model.generateContent(prompt);
//     const response = result.response.text();

//     res.status(200).json({ aiInsights: response });
//   } catch (error) {
//     console.error('AI Error:', error.message);
//     res.status(500).json({ error: 'Failed to analyze with AI' });
//   }
// };
