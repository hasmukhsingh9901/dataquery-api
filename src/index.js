import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { env } from "./config/environment.js";
import { queryController } from "./controllers/query.controller.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.NODE_ENV === "production" ? [""] : "*",
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use(limiter);

app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/query", queryController.handleQuery);
app.post("/explain", queryController.explainQuery);
app.post("/validate", queryController.validateQuery);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    message: env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});

export default app;
