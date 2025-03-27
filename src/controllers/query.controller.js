import AIService from "../services/ai-services.js";
import DatabaseConnection from "../config/database.js";
import { z } from "zod";

const querySchema = z.object({
  question: z.string().min(5, "Query must be at least 5 characters long"),
});

export const queryController = {
  async handleQuery(req, res) {
    try {
      const { question } = querySchema.parse(req.body);

      const sqlQuery = await AIService.convertToSQL(question);

      const result = await DatabaseConnection.query(sqlQuery);

      res.json({
        sql: sqlQuery,
        result,
        metadata: {
          rowCount: result.length,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Query Processing Error:", error);

      const statusCode = error instanceof z.ZodError ? 400 : 500;
      res.status(statusCode).json({
        error: error.message,
        type: error.constructor.name,
      });
    }
  },

  async explainQuery(req, res) {
    try {
      const { question } = querySchema.parse(req.body);
      const explanation = await AIService.explainQuery(question);

      res.json({
        question,
        explanation,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        type: error.constructor.name,
      });
    }
  },

  async validateQuery(req, res) {
    try {
      const { question } = querySchema.parse(req.body);
      const validationResult = await AIService.validateQuery(question);

      res.json({
        ...validationResult,
        query: question,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
        type: error.constructor.name,
      });
    }
  },
};
