import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PORT: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  GEMINI_API_KEY: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment configuration:", parsedEnv.error.errors);
  process.exit(1);
}

export const env = parsedEnv.data;
