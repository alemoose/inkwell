// server/src/app.js
//
// Extracted from index.js so tests can import the Express app without
// binding a real port. index.js now only handles process startup.

import express from "express";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import "./events/listeners/log-published-posts.listener.js";
import "./events/listeners/post-counter.listener.js";

export const app = express();

app.use(express.json());
app.use("/api", healthRoutes);
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use("/api", statsRoutes);

// A05 (Lecture 16): one error handler that never leaks stack traces.
app.use(errorHandler);