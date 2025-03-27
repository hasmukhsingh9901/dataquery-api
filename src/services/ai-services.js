import axios from "axios";
import { env } from "../config/environment.js";

class AIService {
  constructor(apiKey = env.GEMINI_API_KEY) {
    this.apiKey = apiKey;
    this.baseUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  }

  async generateContent(prompt) {
    try {
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const content =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!content) {
        throw new Error("Invalid AI response format");
      }

      return content;
    } catch (error) {
      console.error("AI Service Error:", error.message);
      throw new Error("Failed to generate content from AI");
    }
  }

  async convertToSQL(question) {
    const prompt = `Convert the following question to SQL (only return the SQL query, no explanations, no markdown formatting): ${question}`;
    const sqlQuery = await this.generateContent(prompt);

    return sqlQuery.replace(/```sql|```/g, "").trim();
  }

  async explainQuery(question) {
    const prompt = `Explain the breakdown of this SQL query in simple terms: ${question}`;
    return await this.generateContent(prompt);
  }

  async validateQuery(question) {
    const prompt = `Is this a valid MySQL query? Reply with 'Yes' or 'No' and explain why: ${question}`;
    const response = await this.generateContent(prompt);

    return {
      isValid: response.toLowerCase().includes("yes"),
      message: response,
    };
  }
}

export default new AIService();
